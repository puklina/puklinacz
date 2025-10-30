const { DateTime } = require('luxon');
const Image = require('@11ty/eleventy-img');

// responsive image shortcode
async function imageShortcode(
	src,
	alt = '',
	cls = '',
	sizes = '(min-width: 600px) 100vw, 50vw'
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

	eleventyConfig.addFilter('postDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

	// Add a filter to format dates for structured data
	eleventyConfig.addFilter('isoDate', function (date) {
		return date.toISOString();
	});

	eleventyConfig.addFilter(
		'excludeFromCollection',
		(collection = [], pageUrl = this.ctx.page.url) => {
			return collection.filter((post) => post.url !== pageUrl);
		}
	);

	// register the image shortcode (Nunjucks, Liquid, JS)
	eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
	eleventyConfig.addLiquidShortcode('image', imageShortcode);
	eleventyConfig.addJavaScriptFunction('image', imageShortcode);

	return {
		dir: {
			input: 'src',
			output: 'public',
		},
	};
};
