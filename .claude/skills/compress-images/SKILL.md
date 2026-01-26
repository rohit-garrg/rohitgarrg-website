---
name: compress-images
description: Compress and convert images to WebP format for optimal web performance. Targets <200KB per image with quality preservation.
argument-hint: "[folder-path or 'all']"
allowed-tools: Bash, Read, Glob, Write
---

# Compress Images for Web

This skill compresses images and converts them to WebP format for optimal web performance. It reduces image sizes by 90-97% while maintaining visual quality.

## Usage

```
/compress-images public/images/writing/article-name
/compress-images public/images/speaking/event-name
/compress-images all
```

## Prerequisites

Requires `cwebp` (WebP tools). Install via:
```bash
brew install webp
```

## Instructions

### Step 1: Check for WebP tools
```bash
which cwebp || echo "Install with: brew install webp"
```

### Step 2: Identify target images
If argument is `all`, scan entire `public/images/` directory.
Otherwise, scan the specified folder.

```bash
# List all images with sizes and dimensions
find [TARGET_PATH] -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c '
  echo "$(du -h "$1") - $(sips -g pixelWidth -g pixelHeight "$1" 2>/dev/null | grep pixel | tr "\n" " ")"
' _ {} \;
```

### Step 3: Create backup folder
```bash
mkdir -p [TARGET_PATH]/_originals
```

### Step 4: Process each image

For each image file:

1. **Copy original to backup**
   ```bash
   cp "$file" "[TARGET_PATH]/_originals/"
   ```

2. **Resize if too large** (max 1400px width for content images, 1200px for photos)
   ```bash
   sips -Z 1400 "$file" --out "${file%.*}_resized.${file##*.}" 2>/dev/null
   ```

3. **Convert to WebP** with quality 82-85 (higher for important images)
   ```bash
   cwebp -q 85 "${file%.*}_resized.${file##*.}" -o "${file%.*}.webp" 2>/dev/null
   ```

4. **Clean up temp file**
   ```bash
   rm "${file%.*}_resized.${file##*.}"
   ```

5. **Report size reduction**
   ```bash
   original_size=$(du -h "[BACKUP]/$filename" | cut -f1)
   new_size=$(du -h "${file%.*}.webp" | cut -f1)
   echo "$filename: $original_size -> $new_size"
   ```

### Step 5: Remove original files (after confirming WebP exists)
```bash
rm "$original_file"
```

### Step 6: Update code references

Search for references to the old extensions and update to `.webp`:
```bash
# Find all references
grep -r "\.png\|\.jpg\|\.jpeg" src/
```

Update in:
- Astro pages and components (`.astro` files)
- Markdown content files (`.md` files in `src/content/`)
- Any CSS files with background-image references

### Step 7: Verify build
```bash
npm run build
```

## Size Guidelines

| Image Type | Max Width | Target Size |
|------------|-----------|-------------|
| Article lead images | 1400px | <200KB |
| In-article images | 1400px | <150KB |
| Thumbnails/cards | 600px | <50KB |
| Headshots | 500px | <30KB |
| Speaking photos | 1200px | <150KB |

## Quality Settings

- `cwebp -q 85` for illustrations and graphics
- `cwebp -q 82` for photographs
- `cwebp -q 90` for hero/OG images

## Example Full Workflow

```bash
cd public/images/writing/my-article

# Backup originals
mkdir -p ../_originals/my-article
cp *.png ../_originals/my-article/

# Process each PNG
for f in *.png; do
  sips -Z 1400 "$f" --out "${f%.png}_temp.png"
  cwebp -q 85 "${f%.png}_temp.png" -o "${f%.png}.webp"
  rm "${f%.png}_temp.png"
  echo "$f: $(du -h "../_originals/my-article/$f" | cut -f1) -> $(du -h "${f%.png}.webp" | cut -f1)"
done

# Remove originals
rm *.png
```

## Notes

- Always backup before processing
- Verify images visually after compression
- Update all code references to use `.webp`
- Run `npm run build` to verify no broken references
- Original backups can be deleted once verified
