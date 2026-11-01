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
				{ label: 'Patterns', items: [{ autogenerate: { directory: 'patterns' } }] },
			],
		}),
	],
});
