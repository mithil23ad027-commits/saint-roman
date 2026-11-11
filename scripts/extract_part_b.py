#!/usr/bin/env python3
"""
Utility script to extract the 23 pages of 'part b.pdf'
into 23 individual, high-resolution PNG images:
src/assets/part-b/slide-1.png through slide-23.png
"""
import os
import subprocess
import sys
from PIL import Image

PDF_FILE = "part b.pdf"
OUTPUT_DIR = "src/assets/part-b"
TEMP_DIR = "/tmp/pdf_part_b"

def main():
    if not os.path.exists(PDF_FILE):
        print(f"Error: '{PDF_FILE}' not found!")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)

    print(f"Extracting 23 pages from '{PDF_FILE}' at 175 DPI...")
    # Render with pdftoppm
    cmd = ["pdftoppm", "-png", "-r", "175", PDF_FILE, os.path.join(TEMP_DIR, "page")]
    subprocess.run(cmd, check=True)

    # pdftoppm produces page-01.png ... page-23.png or page-1.png ... page-23.png
    extracted_files = [f for f in os.listdir(TEMP_DIR) if f.startswith("page") and f.endswith(".png")]
    
    # Sort files by numeric page number
    def get_page_num(filename):
        base = filename.replace("page-", "").replace(".png", "")
        try:
            return int(base)
        except ValueError:
            return 9999

    extracted_files.sort(key=get_page_num)
    print(f"Found {len(extracted_files)} rendered pages.")

    for i in range(1, 24):
        # find matching file
        candidates = [f for f in extracted_files if get_page_num(f) == i]
        if not candidates:
            print(f"Error: Missing page {i}!")
            continue
        
        src_path = os.path.join(TEMP_DIR, candidates[0])
        dest_path = os.path.join(OUTPUT_DIR, f"slide-{i}.png")
        
        im = Image.open(src_path)
        im.save(dest_path, "PNG", optimize=True)
        w, h = im.size
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"✓ Page {i:2d} -> {dest_path} ({w}x{h} px, {size_kb:.1f} KB)")

    print(f"\nCompleted! 23 slides successfully saved in '{OUTPUT_DIR}/slide-1.png' through 'slide-23.png'")

if __name__ == "__main__":
    main()
