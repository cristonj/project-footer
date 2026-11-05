import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CreatorProjects } from './index.js';

test('future projects join the shared list and can be the local site', () => {
  const html = renderToStaticMarkup(h(CreatorProjects, {
    currentProject: 'new-project', homeHref: '/home/',
    extraProjects: [{ id: 'new-project', name: 'New Project', href: 'https://example.com/', logo: h('svg', { 'data-original-svg': true }) }],
  }));
  assert(html.includes('href="/home/"'));
  assert(html.includes('data-original-svg'));
  assert(html.indexOf('data-project="new-project"') < html.indexOf('cj-projects__credit'));
  assert(html.includes('data-project="vibe"'));
});

// Shared consumer contract: the current site's home stays local; other projects
// keep canonical destinations, and host-specific content can be composed below.
test('host configuration preserves local home, project order, overrides and footer content', () => {
  const html = renderToStaticMarkup(h(CreatorProjects, {
    currentProject: 'mtw', homeHref: '/es/', projectIds: ['lacuna', 'mtw'],
    projectOverrides: { lacuna: { href: 'https://example.com/', name: 'Preview Lacuna' } },
    createdBy: 'Creado por', logos: { mtw: h('svg', { 'data-custom-logo': true }) },
  }, h('a', { href: '/privacy/' }, 'Privacy')));
  assert(html.includes('href="/es/"'));
  assert(html.includes('href="https://example.com/"'));
  assert(html.indexOf('data-project="mtw"') < html.indexOf('cj-projects__credit'));
  assert(html.indexOf('data-project="lacuna"') > html.indexOf('cj-projects__credit'));
  assert(!html.includes('data-project="vibe"'));
  assert(html.includes('data-custom-logo'));
  assert(html.includes('Creado por'));
  assert(html.includes('href="/privacy/"'));
  assert(!html.includes('<footer'));
});

// Light hosts switch wordmarks with CSS before paint, so both must be in the markup.
test('ChatRPE renders both wordmarks unless the host supplies its own logo', () => {
  const both = renderToStaticMarkup(h(CreatorProjects, { projectIds: ['chatrpe'] }));
  assert(both.includes('cj-projects__asset--chatrpe"'));
  assert(both.includes('cj-projects__asset--chatrpeOutlined"'));
  const custom = renderToStaticMarkup(h(CreatorProjects, { projectIds: ['chatrpe'], logos: { chatrpe: h('svg', { 'data-custom-logo': true }) } }));
  assert(custom.includes('data-custom-logo'));
  assert(!custom.includes('cj-projects__asset--chatrpe'));
});
