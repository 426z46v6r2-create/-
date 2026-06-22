# Stable Baseline Snapshot
Date: 2025-12-29
State Description: Stable hero (original layout, Rubik typography, controlled line breaks), navigation, and contact form working.

## Snapshot Files
- **JavaScript**: `assets/index-STABLE-BASELINE.js`
- **Main CSS**: `assets/styles-STABLE-BASELINE.css`
- **Typography CSS**: `assets/hero-typography-STABLE-BASELINE.css`

## How to Revert
To revert to the stable version, update `index.html` to point to these files:

1. Update script tag:
   ```html
   <script type="module" crossorigin src="./assets/index-STABLE-BASELINE.js"></script>
   ```

2. Update stylesheet links:
   ```html
   <link rel="stylesheet" crossorigin href="./assets/styles-STABLE-BASELINE.css">
   <link rel="stylesheet" href="./assets/hero-typography-STABLE-BASELINE.css">
   ```

Confirm that the site loads correctly and that the console has no new blocking errors.
