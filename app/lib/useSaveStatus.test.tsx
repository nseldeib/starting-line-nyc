import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { useSaveStatus } from '@/app/lib/useSaveStatus';

function Probe({ slug }: { slug: string }) {
  return createElement('span', null, useSaveStatus(slug) ?? 'unsaved');
}

describe('useSaveStatus', () => {
  // The server can't see this browser's saves, so it always renders the plain
  // unsaved state; the saved status appears once the page hydrates.
  it('reports no status during server rendering', () => {
    expect(renderToString(createElement(Probe, { slug: 'nycruns-big-apple-half-marathon' }))).toBe(
      '<span>unsaved</span>',
    );
  });
});
