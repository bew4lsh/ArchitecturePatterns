// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';
import { baseLinks } from './src/plugins/base-links.mjs';

const base = '/ArchitecturePatterns';

// https://astro.build/config
export default defineConfig({
	site: 'https://bew4lsh.github.io',
	base,
	markdown: {
		processor: satteri({ mdastPlugins: [baseLinks({ base })] }),
	},
	integrations: [
		starlight({
			components: {
				// Starlight renders SocialIcons in both the header and the mobile menu footer, so a
				// toggle hosted there is duplicated. SiteTitle renders once, in the header, and sits
				// on the same side as the sidebar.
				SiteTitle: './src/components/overrides/SiteTitle.astro',
			},
			plugins: [starlightThemeFlexoki()],
			title: 'Architecture Patterns',
			description: 'Self-study notes on software architecture patterns.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/bew4lsh/ArchitecturePatterns',
				},
			],
			sidebar: [
				{ label: 'Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
				{ label: 'Architecture styles', items: [{ autogenerate: { directory: 'styles' } }] },
				{ label: 'Messaging', items: [{ autogenerate: { directory: 'messaging' } }] },
				{ label: 'Presentation', items: [{ autogenerate: { directory: 'presentation' } }] },
				{ label: 'Reliability', items: [{ autogenerate: { directory: 'reliability' } }] },
				{ label: 'Scheduling', items: [{ autogenerate: { directory: 'scheduling' } }] },
			],
		}),
	],
});
