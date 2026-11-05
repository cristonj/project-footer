# SVG provenance

These are the projects' canonical optimized SVGs, copied without changing their outlines:

| Asset | Source | Source commit |
| --- | --- | --- |
| Vibe | `cristonj/Vibe-DAW/public/brand/wordmark.svg` | `e90ed836c499428366f8f73df4096dcbeec23a69` |
| MusicTheory.Work | `cristonj/MusicTheory/public/brand/wordmark.svg` | `a14c6f5a7d6ca3cd7e502bedd60acd7799d1dc6a` |
| ChatRPE | `cristonj/ChatRPE/logo.svg` | `f05fd2e2681cf5b65121d8d994ad41ed82e67d78` |
| Lacuna | `cristonj/Lacuna/public/brand/wordmark/lacuna.svg` | `f4cfd691b9bc5c1485b2712f9daa1e8cc86cbd8b` |

The asset build keeps all path coordinates. It makes monochrome ink inherit the host color. ChatRPE's existing outlined Chat and RPE groups are arranged on one baseline, without the square app icon's background. Vibe retains its brand gradient and sheen. All four render as inline vector geometry, without font downloads or raster fallbacks.
