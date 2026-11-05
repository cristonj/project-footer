import { createElement as h } from 'react';
import { assets } from './assets.js';

export const projects = Object.freeze([
  { id: 'vibe', name: 'Vibe DAW', href: 'https://vibedaw.org/' },
  { id: 'mtw', name: 'MusicTheory.Work', href: 'https://musictheory.work/' },
  { id: 'chatrpe', name: 'ChatRPE', href: 'https://www.chatrpe.com/' },
  { id: 'lacuna', name: 'Lacuna', href: 'https://lacunavocab.com/' },
].map(Object.freeze));

const renderAsset = key => h('span', {
  key,
  className: `cj-projects__asset cj-projects__asset--${key}`,
  // Only checked-in, generated SVG assets; never page content or remote markup.
  dangerouslySetInnerHTML: { __html: assets[key] },
});

/** A footer section, not a footer landmark: hosts keep their own navigation and legal content. */
export function CreatorProjects({
  currentProject,
  homeHref = '/',
  extraProjects = [],
  projectIds = [...projects, ...extraProjects].map(project => project.id),
  projectOverrides = {},
  logos = {},
  createdBy = 'Created by',
  creatorName = 'Criston Jackson',
  creatorHref = 'https://www.linkedin.com/in/criston-jackson/',
  projectsLabel = 'Projects by Criston Jackson',
  externalTarget = '_blank',
  className = '',
  style,
  children,
}) {
  const renderProject = id => {
        const original = [...projects, ...extraProjects].find(project => project.id === id);
        if (!original) throw new Error(`Unknown project: ${id}`);
        const project = { ...original, ...projectOverrides[id] };
        const local = id === currentProject;
        return h('a', {
          key: id,
          href: local ? homeHref : project.href,
          'aria-label': project.name,
          'data-project': id,
          className: `cj-projects__project cj-projects__project--${id}`,
          ...(!local && externalTarget === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        }, h('span', { className: 'cj-projects__logo', 'aria-hidden': true },
          logos[id] ?? original.logo ?? renderAsset(id),
          !logos[id] && !original.logo && id === 'chatrpe' ? renderAsset('chatrpeOutlined') : null));
  };
  const current = projectIds.find(id => id === currentProject);
  const related = projectIds.filter(id => id !== currentProject);
  return h('div', { className: `cj-projects ${className}`.trim(), style },
    current ? h('div', { className: 'cj-projects__current' }, renderProject(current)) : null,
    children ? h('div', { className: 'cj-projects__content' }, children) : null,
    h('p', { className: 'cj-projects__credit' }, createdBy, ' ',
      h('a', { href: creatorHref }, creatorName)),
    related.length ? h('nav', { className: 'cj-projects__brands', 'aria-label': projectsLabel },
      related.map(renderProject)) : null);
}
