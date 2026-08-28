# Visual thesis: inked evidence trail

## Direction and reason

Show Your Debugging uses a risograph tactile collage. Debugging is rarely a clean line. It is a pile of guesses, terminal scraps, crossed-out notes, and one useful correction. The interface turns that pile into an ordered evidence trail without making it feel graded or corporate.

The visual signature is a coral paper trail crossing a deep aubergine field. Blue-violet ink sits slightly out of register. Ragged paper edges, halftone dots, stamped step numbers, and offset shadows recall a learner's workbench. The task UI stays crisp because the learner must read code and test output without decorative noise.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#24152F` | Primary text and deep field |
| `--paper` | `#FFF7E8` | Main page and readable sheets |
| `--paper-deep` | `#F2E5CB` | Quiet sections and inset fields |
| `--coral` | `#D94B43` | Primary action and proof marks |
| `--coral-dark` | `#9B2729` | Hover and small-text coral |
| `--violet` | `#5943A9` | Secondary ink and focus ring |
| `--violet-dark` | `#36236F` | High-contrast violet text |
| `--teal` | `#0E746E` | Success and completed steps |
| `--amber` | `#9A5B00` | Warnings |
| `--danger` | `#A52334` | Errors |

This is an intentionally single-mode, warm-paper treatment. The background is always painted. Text combinations meet 4.5:1 contrast. Color never carries state alone; stamps and words repeat each status.

## Type

- Display: `Arial Black`, `Arial Narrow Bold`, system sans-serif. Tight tracking and compact line height mimic a hand-set workshop poster without a font download.
- Body and controls: `Trebuchet MS`, `Segoe UI`, system sans-serif. Open forms keep instructions readable on narrow screens.
- Code and test output: `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace.

No font files or third-party font requests are needed. Type scale: 14, 16, 20, 28, 44, and 68 px with responsive clamps.

## Space, shape, and layout

- Base unit: 8 px. Major section gaps use 64–112 px. Controls use 12–24 px internal space.
- Reading measure: 66 characters. The editor workbench may grow wider for terminal output.
- Buttons and fields have clipped paper corners, not fully rounded SaaS pills.
- Independent receipts use offset hard shadows. Related form steps use proximity and a continuous trail line.
- Every pointer target is at least 44 by 44 CSS pixels.
- At 390 px, navigation trims to essential links, the hero stacks, and receipt actions become full width.

## Interaction grammar

- A pressed button shifts two pixels toward its hard shadow.
- Completing a practice step adds a short ink-stamp mark and advances the trail.
- Route changes focus the new heading and announce its title.
- Saving shows a direct status sentence. Removing all receipts requires a named confirmation.
- Keyboard path: Tab through fields and actions; `Ctrl/Cmd+Enter` advances the active practice step; Escape closes dialogs.

## Motion policy

One signature motion is used: evidence slips settle upward by 10 px as they become part of a receipt. Transitions last 180–240 ms and change only transform and opacity. Nothing loops. Under `prefers-reduced-motion: reduce`, transforms and smooth scrolling are removed and state changes are immediate.

## Original asset plan and prompt sheet

The hero uses one generated landscape collage. It contains a terminal window, pencil hypothesis slip, test strip, looping red thread, and registration marks. It contains no readable text, people, brands, logos, or product UI claims. CSS adds the product's accessible labels outside the image. A hand-authored SVG stamp supplies the favicon and wordmark mark.

Prompt:

> Use case: stylized-concept. Asset type: wide landing hero illustration. A tactile risograph collage on warm cream paper showing a beginner developer's debugging workbench from above: a simple dark terminal rectangle, a torn hypothesis note, a narrow test-output strip, a corrected code slip, and a coral thread connecting the four pieces in order. Two-ink print with deep aubergine, vermilion coral, muted blue-violet, and a tiny teal proof mark. Visible halftone grain, fibrous paper, rough cut edges, slight ink misregistration, bold editorial composition, generous calm negative space, no people. No readable text, no letters, no numbers, no logos, no brands, no watermark, no glossy 3D, no gradients, no photorealistic screens.

Provenance: generated for this product on 2026-08-28 with the Factory Azure image deployment through `/opt/fleet/lib/gen-image.sh`. The selected PNG source and prompt sidecar live in `assets/src/`. The shipped WebP is optimized to 1200 × 800 and no more than 300 KB. Generated imagery is original to this product.

## Dark surfaces

The terminal and browser-extension header are deliberate dark ink islands within the single warm-paper theme. Their text uses paper white, pale lavender, and mint. This provides depth without introducing a separate global theme.
