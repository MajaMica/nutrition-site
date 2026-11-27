
import subprocess
import json
import argparse
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--fps", type=int, default=24)
parser.add_argument("--width", type=int, default=1920)
parser.add_argument("--quality", type=int, default=85)
args = parser.parse_args()

SOURCE = Path(__file__).resolve().parent.parent / "videos"
PROJECT = Path(__file__).resolve().parent.parent
OUTPUT = PROJECT / "assets/sequences"

OUTPUT.mkdir(parents=True, exist_ok=True)

videos = sorted(
    SOURCE.glob("*.mp4"),
    key=lambda p: int(p.stem)
)

if not videos:
    raise SystemExit(f"Nema MP4 fajlova u {SOURCE}")

manifest = {
    "fps": args.fps,
    "width": args.width,
    "format": "webp",
    "scenes": []
}

global_index = 0

for video in videos:
    scene_name = f"scene-{int(video.stem):03d}"
    scene_dir = OUTPUT / scene_name
    scene_dir.mkdir(exist_ok=True)

    print(f"\nProcessing: {video.name}")

    # Remove old frames
    for old_frame in scene_dir.glob("frame_*.webp"):
        old_frame.unlink()

    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "warning",
        "-y",
        "-i", str(video),
        "-an",
        "-vf",
        (
            f"fps={args.fps},"
            f"scale={args.width}:-2:flags=lanczos"
        ),
        "-c:v", "libwebp",
        "-quality", str(args.quality),
        "-compression_level", "4",
        "-start_number", str(global_index),
        str(scene_dir / "frame_%06d.webp")
    ]

    subprocess.run(command, check=True)

    frames = sorted(scene_dir.glob("frame_*.webp"))
    count = len(frames)

    if not count:
        raise RuntimeError(f"No frames: {video.name}")

    total_bytes = sum(
        frame.stat().st_size for frame in frames
    )

    manifest["scenes"].append({
        "name": scene_name,
        "source": video.name,
        "directory": f"sequences/{scene_name}",
        "startFrame": global_index,
        "endFrame": global_index + count - 1,
        "frameCount": count,
        "sizeMB": round(total_bytes / 1_000_000, 2)
    })

    global_index += count

    print(f"Frames: {count}")
    print(f"Size: {total_bytes / 1_000_000:.2f} MB")

manifest["totalFrames"] = global_index

manifest_path = PROJECT / "assets/manifest.json"

manifest_path.write_text(
    json.dumps(manifest, indent=2),
    encoding="utf-8"
)

print("\nExtraction completed!")
print(f"Total frames: {global_index}")
print(f"Manifest: {manifest_path}")
