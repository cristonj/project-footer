import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CreatorProjects } from '../index.js';

const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const variants = [
  { id: 'vibe', name: 'Vibe', bg: '#050505', ink: '#f5f5f5', muted: '#9999a3', accent: '#ccff00', links: ['Terms', 'Privacy', 'GitHub'] },
  { id: 'mtw', name: 'MusicTheory.Work', bg: '#000', ink: '#fff', muted: '#9999a3', accent: '#ccff00', links: ['Scales', 'Chords', 'Keys', 'Glossary', 'About & credits', 'Terms', 'Privacy'] },
  { id: 'chatrpe', name: 'ChatRPE', bg: '#020817', ink: '#fff', muted: '#7f8ea3', accent: '#ccff00', links: [] },
  { id: 'lacuna', name: 'Lacuna', bg: '#faf7f2', ink: '#211e1b', muted: '#625d58', accent: '#4f810e', links: ['Terms', 'Privacy'] },
];

const render = variant => renderToStaticMarkup(h('section', { className: 'example' },
  h('p', { className: 'example-label' }, variant.name),
  h('div', { className: 'surface', style: { background: variant.bg, color: variant.ink } },
    h(CreatorProjects, { currentProject: variant.id, style: {
      '--cj-muted': variant.muted,
      ...(variant.id === 'lacuna' ? { '--cj-chatrpe-plain': 'none', '--cj-chatrpe-outlined': 'block','--cj-brand-gap': '12px 24px', '--cj-row-gap': '12px' } : {}),
    } }, variant.links.length ? h('nav', { className: 'example-links', 'aria-label': 'Site navigation' },
      variant.links.map(label => h('a', { key: label, href: '#' }, label))) : null))));

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}.example{margin:0 0 24px}.example-label{margin:0 0 10px;font:500 14px system-ui}.surface{padding:20px 24px;border-radius:var(--radius,12px)}.example-links{display:flex;flex-wrap:wrap;justify-content:center;gap:0 24px;font-size:13px}.example-links a{display:inline-flex;align-items:center;min-height:44px;color:inherit;text-decoration:none}
</style></head><body>${variants.map(render).join('')}</body></html>`;
mkdirSync(new URL('../.qa/', import.meta.url), { recursive: true });
writeFileSync(new URL('../.qa/preview.html', import.meta.url), html);
console.log('Wrote .qa/preview.html');
