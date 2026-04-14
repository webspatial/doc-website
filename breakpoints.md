## Media Query Breakpoints Currently Used

- `<=430`: navbar logo switches from full logo to compact logo
- `<=576`: small mobile spacing, blog title reduction, mobile card adjustments
- `577-996`: tablet and compact layout range
- `<=996` / `>=997`: mobile vs desktop split for navbar and docs layout
- `>=768`: homepage hero switches to landscape stage; `DocCardListWithTOC` switches to 2 columns
- `<=1130`: DocSearch switches to compact button mode
- `<=1200` / `>=1200`: locale label shrink and homepage hero fine-tuning
- `>=1280`: `DocCardListWithTOC` switches to 3 columns
- `>=1281`: large desktop layouts for homepage sections, cards, sliders, and related content blocks
- `>=1439`: site shell max width and side dividers

## Notes

- Showcase cards no longer use fixed breakpoint-based column counts. They use `repeat(auto-fill, minmax(280px, 1fr))`.
- `997`, `1280`, and `1439` are used as major layout thresholds in multiple places, but the exact behavior depends on the component.
