// src/admin/preview.js

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
				h('div', {
					className: 'project-overview__bg',
					'aria-hidden': 'true',
					style: image ? { backgroundImage: `url(${image})` } : {},
				}),
				h(
					'div',
					{ className: 'project-overview__content wrapper--wide' },
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

			// MAIN CONTENT (body)
			h(
				'div',
				{ className: 'wrapper--narrow' },
				h('div', { className: 'project-content' }, body),
			),

			// GALLERY PLACEHOLDER
			h(
				'div',
				{
					className: 'gallery wrapper--wide mt-6',
					style: { textAlign: 'center', opacity: 0.7 },
				},
				h(
					'p',
					{ style: { fontStyle: 'italic' } },
					'[Galerie se v náhledu nezobrazuje. Po publikování se zobrazí zde.]',
				),
			),

			// CTA section
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

CMS.registerPreviewTemplate('realizovane-zakazky', ProjectPreview);
