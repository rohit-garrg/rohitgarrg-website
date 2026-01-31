---
name: remove-gemini-watermark
description: Remove Gemini AI watermark (diamond shape in bottom-right corner) from images. Use this for Gemini-generated images.
argument-hint: "[article-folder-name]"
allowed-tools: Bash, Read, Glob
---

# Remove Gemini Watermark

This skill removes the diamond-shaped Gemini AI watermark from images in an article's image folder.

## Usage

Invoke with the article folder name (the folder inside `public/images/writing/`):

```
/remove-gemini-watermark exceptional-managers
```

## Instructions

1. First, find all PNG and JPG images in the specified folder:
   ```
   public/images/writing/$ARGUMENTS/
   ```

2. For each image, use `sips` to crop the watermark:
   - Gemini watermarks are in the bottom-right corner
   - Crop approximately 360 pixels from the bottom (about 23% of a 1536px tall image)
   - Crop approximately 100 pixels from the right (about 3.5% of a 2816px wide image)

3. Use this command pattern for each image:
   ```bash
   # Get current dimensions
   h=$(sips -g pixelHeight "$file" | tail -1 | awk '{print $2}')
   w=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')

   # Calculate new dimensions (crop ~23% from bottom, ~3.5% from right)
   new_h=$((h * 77 / 100))
   new_w=$((w * 965 / 1000))

   # Crop from top-left corner (removes bottom and right)
   sips --cropOffset 0 0 -c $new_h $new_w "$file" --out "$file"
   ```

4. After cropping, verify by reading one of the images to confirm the watermark is removed.

5. Report how many images were processed.

## Important: Check Before Cropping

**Before running this skill, visually inspect the images.** If important content (text, icons, diagram elements) is near the bottom or right edges, DO NOT crop. The 23% bottom / 3.5% right crop will remove that content.

In such cases:
- Inform the user the watermark cannot be auto-removed without losing content
- Suggest manual removal in an image editor, or leaving the subtle watermark as-is

## Notes

- This uses macOS `sips` command (built-in)
- The crop percentages are calibrated for standard Gemini image output (2816x1536)
- Always verify the result after processing
