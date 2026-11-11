#!/usr/bin/env python3
"""
Utility script to extract the 5 pages of 'Saint Roman web.pdf'
into 5 individual, high-resolution PNG images:
src/assets/slide-1.png through slide-5.png
"""
import os
import subprocess
import sys
from PIL import Image

PDF_FILE = "Saint Roman web.pdf"
OUTPUT_DIR = "src/assets"

def main():
    if not os.path.exists(PDF_FILE):
        print(f"Error: {PDF_FILE} not found!")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs("/tmp/pdf_extract", exist_ok=True)

    print(f"Extracting 5 pages from '{PDF_FILE}' at high resolution (175 DPI)...")
    # Render using pdftoppm for crisp vector & text rendering quality
    cmd = ["pdftoppm", "-png", "-r", "175", PDF_FILE, "/tmp/pdf_extract/page"]
    subprocess.run(cmd, check=True)

    # Save to src/assets/slide-1.png ... slide-5.png
    for i in range(1, 6):
        src_page = f"/tmp/pdf_extract/page-{i}.png"
        dest_slide = os.path.join(OUTPUT_DIR, f"slide-{i}.png")
        if os.path.exists(src_page):
            im = Image.open(src_page)
            im.save(dest_slide, "PNG", optimize=True)
            w, h = im.size
            size_mb = os.path.getsize(dest_slide) / (1024 * 1024)
            print(f"✓ Saved Page {i} -> {dest_slide} ({w}x{h} px, {size_mb:.2f} MB)")
        else:
            print(f"Warning: {src_page} not found!")

    print("\nExtraction complete! All 5 slides saved to src/assets/slide-1.png through slide-5.png")

if __name__ == "__main__":
    main()
