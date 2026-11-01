function isRootRelative(url) {
	return typeof url === 'string' && url.startsWith('/') && !url.startsWith('//');
}

/**
 * Astro does not apply `base` to links written in Markdown, so a site deployed
 * to a subpath serves broken internal links. This rewrites root-relative links
 * at build time and keeps the content itself base-agnostic.
 */
export function baseLinks({ base } = {}) {
	const prefix = typeof base === 'string' ? base.replace(/\/$/, '') : '';
	if (!prefix || prefix === '/') return null;

	const rewrite = (node, context) => {
		if (isRootRelative(node.url)) context.setProperty(node, 'url', prefix + node.url);
	};

	return { name: 'base-links', link: rewrite, image: rewrite, definition: rewrite };
}
