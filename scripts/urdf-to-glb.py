"""One-time asset pipeline: parse the Unitree G1 URDF, build a trimesh scene that
mirrors the URDF link/joint hierarchy (one scene-graph node per link, one edge per
joint), and export a GLB for the website. Joint nodes keep their URDF names so the
site can rotate them at runtime.

Usage (from repo root):
  D:/NVIDIA/G1/G1_Sim/.venv/Scripts/python.exe scripts/urdf-to-glb.py
"""

import os
import xml.etree.ElementTree as ET

import numpy as np
import trimesh

URDF_DIR = r"D:\NVIDIA\G1\G1_Sim\assets\robots\unitree_g1_brainco\source\unitree_ros\g1_with_brainco_hand"
URDF = os.path.join(URDF_DIR, "g1_29dof_mode_15_brainco_hand.urdf")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "robot", "g1_raw.glb")


def origin_matrix(elem):
    """URDF <origin xyz rpy> -> 4x4 homogeneous matrix (identity if absent)."""
    if elem is None:
        return np.eye(4)
    xyz = [float(v) for v in (elem.get("xyz") or "0 0 0").split()]
    rpy = [float(v) for v in (elem.get("rpy") or "0 0 0").split()]
    m = trimesh.transformations.euler_matrix(*rpy, axes="sxyz")
    m[:3, 3] = xyz
    return m


def main():
    root = ET.parse(URDF).getroot()

    scene = trimesh.Scene(base_frame="world")
    mesh_cache = {}

    # Links: one graph node per link; visual meshes attach in the link frame.
    for link in root.iter("link"):
        name = link.get("name")
        for i, visual in enumerate(link.iter("visual")):
            geom = visual.find("geometry")
            mesh_tag = geom.find("mesh") if geom is not None else None
            if mesh_tag is None:
                continue  # skip primitive visuals (none expected in this URDF)
            path = os.path.join(URDF_DIR, mesh_tag.get("filename"))
            if path not in mesh_cache:
                mesh_cache[path] = trimesh.load_mesh(path)
            mesh = mesh_cache[path]
            scale = mesh_tag.get("scale")
            t = origin_matrix(visual.find("origin"))
            if scale:
                s = [float(v) for v in scale.split()]
                t = t @ trimesh.transformations.scale_matrix(s[0])
            scene.add_geometry(
                mesh,
                node_name=name if i == 0 else f"{name}__vis{i}",
                geom_name=f"{name}_geom{i}",
                parent_node_name=name,
                transform=t,
            )

    # Joints: edge parent_link -> child_link carrying the joint origin transform.
    # For revolute joints the site rotates the child node around the joint axis
    # (axis is expressed in the child link frame), so this static transform is
    # exactly the pre-rotation part.
    joints = {}
    for joint in root.iter("joint"):
        parent = joint.find("parent").get("link")
        child = joint.find("child").get("link")
        joints[child] = (parent, origin_matrix(joint.find("origin")), joint.get("type"))

    roots = set(scene.graph.nodes) - set(joints)
    for child, (parent, matrix, _jtype) in joints.items():
        scene.graph.update(frame_from=parent, frame_to=child, matrix=matrix)
    for r in roots - {"world"}:
        scene.graph.update(frame_from="world", frame_to=r, matrix=np.eye(4))

    required = [
        "pelvis", "torso_link", "head_link",
        "left_hip_pitch_link", "left_knee_link", "left_ankle_pitch_link",
        "right_hip_pitch_link", "right_knee_link", "right_ankle_pitch_link",
        "left_shoulder_pitch_link", "left_elbow_link",
        "right_shoulder_pitch_link", "right_elbow_link",
    ]
    missing = [r for r in required if r not in scene.graph.nodes]
    print(f"nodes: {len(scene.graph.nodes)}, meshes: {len(mesh_cache)}")
    if missing:
        print("WARNING missing link nodes:", missing)
    else:
        print("all required link nodes present")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    scene.export(OUT)
    print("wrote", os.path.abspath(OUT), f"{os.path.getsize(OUT) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
