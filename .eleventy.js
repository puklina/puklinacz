const { DateTime } = require('luxon');
const Image = require('@11ty/eleventy-img');
const slugify = require('slugify');

// responsive image shortcode
async function imageShortcode(
	src,
	alt = '',
	cls = '',
	sizes = '(min-width: 600px) 100vw, 50vw',
) {
	let metadata = await Image(src, {
		widths: [320, 640, 960, 1280, 1920],
		formats: ['avif', 'webp', 'jpeg'],
		urlPath: '/assets/blog/',
		outputDir: './public/assets/blog/',
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: 'lazy',
		decoding: 'async',
	};

	if (cls) {
		imageAttributes.class = cls;
	}

	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('./src/css');
	eleventyConfig.addPassthroughCopy('./src/js');
	eleventyConfig.addPassthroughCopy('./src/assets');
	eleventyConfig.addPassthroughCopy('./src/admin');
	eleventyConfig.addPassthroughCopy('src/_redirects');
	eleventyConfig.addPassthroughCopy('src/script.js');

	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

	eleventyConfig.addFilter('monthYear', (dateObj) => {
		if (!dateObj) return '';
		return DateTime.fromJSDate(new Date(dateObj)).toFormat('MM/yyyy');
	});

	eleventyConfig.addFilter('slug', (value) => {
		return slugify(value, {
			lower: true,
			strict: true,
			locale: 'cs',
		});
	});

	eleventyConfig.addFilter(
		'excludeFromCollection',
		(collection = [], pageUrl = this.ctx.page.url) => {
			return collection.filter((post) => post.url !== pageUrl);
		},
	);

	// register the image shortcode (Nunjucks, Liquid, JS)
	eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
	eleventyConfig.addLiquidShortcode('image', imageShortcode);
	eleventyConfig.addJavaScriptFunction('image', imageShortcode);

	eleventyConfig.addCollection('projects', (collection) =>
		collection.getFilteredByGlob('src/realizovane-zakazky/*.md'),
	);

	// Convert file names to alt text
	eleventyConfig.addFilter('filenameToAlt', function (path = '') {
		if (!path) return '';
		// Get last segment
		const parts = path.split('/');
		const file = parts[parts.length - 1];
		// Remove extension
		const name = file.replace(/\.[^/.]+$/, ''); // "strecha-zvenku-libava"
		// Remove trailing numbers like "-01", "_2" if you want
		const cleaned = name.replace(/[-_]\d+$/, ''); // "strecha-zvenku-libava"
		// Replace dashes/underscores with spaces
		let alt = cleaned.replace(/[-_]+/g, ' '); // "strecha zvenku libava"
		// Sentence case: first letter upper, rest as-is
		alt = alt.charAt(0).toUpperCase() + alt.slice(1);
		return alt;
	});
	// image optimization filter
	eleventyConfig.addFilter(
		'netlifyImg',
		function (src, width = 800, quality = 75) {
			if (!src) return src;
			// Assumes `src` is a relative path on your site
			const params = new URLSearchParams({
				url: src,
				w: width.toString(),
				q: quality.toString(),
			});
			return `/.netlify/images?${params.toString()}`;
		},
	);
	// Build optimized hero background URLs via Netlify Image CDN [web:56][web:57]
	eleventyConfig.addFilter(
		'netlifyBg',
		function (src, width = 1600, quality = 75) {
			if (!src) return src;
			const params = new URLSearchParams({
				url: src,
				w: width.toString(),
				q: quality.toString(),
				fit: 'cover',
			});
			return `/.netlify/images?${params.toString()}`;
		},
	);

	return {
		dir: {
			input: 'src',
			output: 'public',
		},
	};
};
