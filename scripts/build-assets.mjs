import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFileSync(`${root}assets/${name}.svg`, 'utf8').replace(/\r\n/g, '\n');
// Preserve canonical outlines. Only presentation attributes change for inherited ink.
const clean = svg => svg.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg\b[^>]*>/, tag => tag.replace(/\s+(role|aria-label|aria-labelledby|width|height)="[^"]*"/g, '')).replace(/<title[\s\S]*?<\/title>/g, '').replace(/\s{2,}/g, ' ').trim();
const mtw = clean(read('mtw')).replaceAll('#fff', 'currentColor');
const lacuna = clean(read('lacuna')).replaceAll('#211e1b', 'currentColor');
const vibe = clean(read('vibe')).replaceAll('#ffffff', 'currentColor');
// ChatRPE's canonical logo has two outlined rows. Reuse those exact paths on one
// baseline for a footer wordmark, removing the square icon's background and glow.
const chatSource = read('chatrpe');
const groups = [...chatSource.matchAll(/<g fill="(#[A-Fa-f0-9]+)" transform="[^"]*">([\s\S]*?)<\/g>/g)];
if (groups.length !== 2) throw new Error('Expected the canonical Chat and RPE outline groups');
const lettering = (chatFill, rpeFill) => `<g fill="${chatFill}" transform="translate(0 1516) scale(1 -1)">${groups[0][2]}</g><g fill="${rpeFill}" transform="translate(4314.8 1516) scale(1 -1)">${groups[1][2]}</g>`;
const ink = 'var(--cj-chatrpe-ink,#fff)';
const accent = 'var(--cj-chatrpe-accent,#ccff00)';
const chatrpe = clean(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7917 1541">${lettering(ink, accent)}</svg>`);

// Light surfaces: the same lettering over a heavy black outline. Paint every outline
// first, then every fill, so a later letter's stroke cannot cover an earlier letter's
// fill. The padded viewBox reserves room for the 150-unit outer half of the stroke.
const outlineColor = 'var(--cj-chatrpe-outline,#000)';
// The stroke leaves the C's center page-coloured; this fills it black like the R and P
// centers. It sits inside the C's arms and the h's stroke, so it never shows outside them.
const cCenter = `<rect fill="${outlineColor}" x="600" y="520" width="600" height="550"/>`;
const chatrpeOutlined = clean(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-200 -200 8317 1941"><g data-outline="chatrpe">${cCenter}<g stroke="${outlineColor}" stroke-width="300" stroke-linejoin="round">${lettering('none', 'none')}</g></g><g data-lettering="chatrpe">${lettering(ink, accent)}</g></svg>`);
writeFileSync(`${root}assets.js`, `// Generated from the canonical SVGs in assets/ by scripts/build-assets.mjs.\nexport const assets = ${JSON.stringify({ vibe, mtw, chatrpe, chatrpeOutlined, lacuna })};\n`);
