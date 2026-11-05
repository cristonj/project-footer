import type { CSSProperties, ReactNode } from 'react';

export type ProjectId = 'vibe' | 'mtw' | 'chatrpe' | 'lacuna';
export interface Project { readonly id: ProjectId; readonly name: string; readonly href: string }
export const projects: readonly Project[];
export interface CreatorProjectsProps {
  currentProject?: string;
  homeHref?: string;
  /** Select and order projects. Defaults to all four. */
  projectIds?: readonly string[];
  /** Register future projects using their original SVG component. */
  extraProjects?: readonly { id: string; name: string; href: string; logo: ReactNode }[];
  projectOverrides?: Partial<Record<string, Partial<Pick<Project, 'name' | 'href'>>>>;
  /** Supply original brand components where a host needs its own theming or motion. */
  logos?: Partial<Record<string, ReactNode>>;
  createdBy?: string;
  creatorName?: string;
  creatorHref?: string;
  projectsLabel?: string;
  externalTarget?: '_blank' | '_self';
  className?: string;
  style?: CSSProperties & { [key: `--cj-${string}`]: string | number };
  children?: ReactNode;
}
export function CreatorProjects(props: CreatorProjectsProps): ReactNode;
