import os
from collections import defaultdict

ROOT = os.path.dirname(os.path.abspath(__file__))

IGNORE_DIRS = {
    ".git",
    ".vscode",
    "node_modules",
    "__pycache__",
    ".idea",
}

IGNORE_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico",
    ".mp4", ".mov", ".avi", ".mkv",
    ".mp3", ".wav", ".ogg",
    ".zip", ".rar", ".7z",
    ".exe", ".dll",
    ".bin", ".iso",
    ".woff", ".woff2", ".ttf", ".otf",
    ".pdf",
}

stats = {
    "files": 0,
    "folders": 0,
    "lines": 0,
    "blank": 0,
    "code": 0,
    "comments": 0,
    "chars": 0,
    "words": 0,
    "bytes": 0,
}

extensions = defaultdict(lambda: {
    "files": 0,
    "lines": 0,
    "chars": 0,
    "words": 0,
    "bytes": 0,
})

def scan_file(path):
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        return

    lines = content.splitlines()
    ext = os.path.splitext(path)[1].lower() or "[no extension]"

    file_stats = extensions[ext]

    file_stats["files"] += 1
    file_stats["lines"] += len(lines)
    file_stats["chars"] += len(content)
    file_stats["words"] += len(content.split())

    try:
        file_stats["bytes"] += os.path.getsize(path)
    except OSError:
        pass

    stats["files"] += 1
    stats["lines"] += len(lines)
    stats["chars"] += len(content)
    stats["words"] += len(content.split())

    try:
        stats["bytes"] += os.path.getsize(path)
    except OSError:
        pass

    for line in lines:
        stripped = line.strip()

        if not stripped:
            stats["blank"] += 1
        else:
            stats["code"] += 1

            if (
                stripped.startswith("//")
                or stripped.startswith("#")
                or stripped.startswith("/*")
                or stripped.startswith("*")
                or stripped.startswith("<!--")
            ):
                stats["comments"] += 1
                stats["code"] -= 1

def scan_directory(root):
    for current_root, dirs, files in os.walk(root):
        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRS
        ]

        if current_root != root:
            stats["folders"] += 1

        for filename in files:
            path = os.path.join(current_root, filename)
            ext = os.path.splitext(filename)[1].lower()

            if ext in IGNORE_EXTENSIONS:
                continue

            scan_file(path)

def format_bytes(size):
    units = ["B", "KB", "MB", "GB"]

    for unit in units:
        if size < 1024:
            return f"{size:.2f} {unit}"
        size /= 1024

    return f"{size:.2f} TB"

scan_directory(ROOT)

print()
print("=" * 60)
print("PROJECT STATISTICS")
print("=" * 60)
print(f"Root:       {ROOT}")
print()
print(f"Folders:    {stats['folders']:,}")
print(f"Files:      {stats['files']:,}")
print(f"Lines:      {stats['lines']:,}")
print(f"Code:       {stats['code']:,}")
print(f"Comments:   {stats['comments']:,}")
print(f"Blank:      {stats['blank']:,}")
print(f"Characters: {stats['chars']:,}")
print(f"Words:      {stats['words']:,}")
print(f"Size:       {format_bytes(stats['bytes'])}")

print()
print("-" * 60)
print("BY FILE TYPE")
print("-" * 60)

for ext, data in sorted(
    extensions.items(),
    key=lambda x: x[1]["lines"],
    reverse=True
):
    print(
        f"{ext:<15}"
        f"{data['files']:>6} files  "
        f"{data['lines']:>9,} lines  "
        f"{data['chars']:>12,} chars  "
        f"{data['words']:>10,} words"
    )

print("=" * 60)
input('Press ENTER to exit...')