// src/admin/preview.js
// Decap provides createClass and h globally.

const ProjectPreview = createClass({
	render: function () {
		const entry = this.props.entry;
		const data = entry.get('data');

		const title = data.get('title') || '';
		const description = data.get('description') || '';
		const image = data.get('image');
		const startDate = data.get('start_date');
		const endDate = data.get('end_date');
		const body = this.props.widgetFor('body');

		// Gallery can be Immutable.List or plain array
		const rawGallery = data.get('gallery');
		const gallery = rawGallery
			? rawGallery.toArray
				? rawGallery.toArray()
				: rawGallery
			: [];

		// Split title like in Nunjucks template
		const words = title.trim().split(' ');
		const lastWord = words.length > 1 ? words[words.length - 1] : title;
		const firstWords = words.length > 1 ? words.slice(0, -1).join(' ') : '';

		return h(
			'article',
			{ className: 'project' },

			// TOP OVERVIEW / HERO
			h(
				'div',
				{ className: 'project-overview' },

				// Background image
				h('div', {
					className: 'project-overview__bg',
					'aria-hidden': 'true',
					style: image ? { backgroundImage: `url(${image})` } : {},
				}),

				// Title + description + dates
				h(
					'div',
					{ className: 'project-overview__content wrapper--wide' },

					// Title block
					h(
						'div',
						{ className: 'project-title' },
						h(
							'h1',
							{ className: 'hug' },
							firstWords ? firstWords + ' ' : '',
							h('span', { className: 'clr-primary' }, lastWord),
						),
					),

					// Description + Realizace dates
					h(
						'div',
						{ className: 'project-description' },

						description &&
							h('p', { className: 'lead' }, h('strong', {}, description)),

						startDate &&
							endDate &&
							h(
								'p',
								{ className: 'realizace' },
								h('strong', {}, 'Realizace: ', startDate, ' – ', endDate),
							),
					),
				),
			),

			// MAIN CONTENT
			h(
				'div',
				{ className: 'wrapper--narrow' },
				h('div', { className: 'project-content' }, body),
			),

			// GALLERY SECTION (simple img tags, no Eleventy shortcodes)
			gallery.length > 0 &&
				h(
					'div',
					{ className: 'gallery wrapper--wide' },
					gallery.map((item, index) => {
						// list field with `field: { name: image }` -> each item is { image: "path" }
						const imgSrc = item.image || item;

						return h(
							'div',
							{
								key: index,
								className: 'gallery__item',
								'data-full': imgSrc,
							},
							h('img', {
								className: 'mx-auto',
								src: imgSrc,
								alt: '',
								loading: 'lazy',
								decoding: 'async',
							}),
						);
					}),
				),

			// BOTTOM CTA SECTION (button + back link)
			h(
				'div',
				{ className: 'wrapper--narrow text-center mt-6' },
				h(
					'p',
					null,
					h(
						'a',
						{ href: '/#kontakt', className: 'button' },
						'Nezávazně poptat',
					),
				),
				h(
					'p',
					{ className: 'small-print mt-4' },
					h(
						'a',
						{
							href: '/',
							className: 'btn btn--primary link-unstyled faded',
						},
						'← Nebo zpět na hlavní stránku',
					),
				),
			),
		);
	},
});

// IMPORTANT: use the collection "name" from config.yml
CMS.registerPreviewTemplate('realizovane-zakazky', ProjectPreview);
