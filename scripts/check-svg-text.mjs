// Fails the build when an inline SVG's text is split across lines.
//
// MDX parses multi-line content as markdown and wraps it in a <p>. A <p> inside an <svg> is not
// valid, so the HTML parser closes the SVG at that point: every rect and line after it renders as
// nothing, and the labels reflow as paragraphs. The page still builds, and only a browser shows it.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/content/docs';
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const TAG = /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|'[^']*'|[^>"'])*?)(\/?)>/g;

function mdxFiles(dir) {
	return readdirSync(dir).flatMap((entry) => {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) return mdxFiles(path);
		return path.endsWith('.mdx') ? [path] : [];
	});
}

const problems = [];

for (const file of mdxFiles(ROOT)) {
	const source = readFileSync(file, 'utf8');
	const stack = [];
	let cursor = 0;

	for (const match of source.matchAll(TAG)) {
		const [tag, closing, name, , selfClosing] = match;
		const text = source.slice(cursor, match.index);
		cursor = match.index + tag.length;

		const inSvg = stack.includes('svg');
		if (inSvg && text.includes('\n') && /\S/.test(text)) {
			const line = source.slice(0, match.index).split('\n').length;
			const parent = stack.at(-1);
			problems.push(`${file}:${line}  text inside <${parent}> spans lines: ${text.trim().slice(0, 48)}`);
		}

		if (closing) {
			if (stack.at(-1) === name) stack.pop();
		} else if (!selfClosing && !VOID.has(name)) {
			stack.push(name);
		}
	}
}

if (problems.length > 0) {
	console.error('Multi-line text inside an inline SVG breaks the figure: MDX wraps it in a <p>,');
	console.error('and a <p> inside an <svg> makes the browser close the SVG early.\n');
	for (const problem of problems) console.error(`  ${problem}`);
	console.error('\nKeep each element\'s text on the same line as its tags, for example:');
	console.error('  <text x="22" y="209" style="…">dependency direction</text>');
	process.exit(1);
}

console.log('svg text: no multi-line text inside an inline SVG');
