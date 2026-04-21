// Lightbox для дипломов
document.addEventListener('DOMContentLoaded', () => {
	const overlay = document.createElement('div');
	overlay.className = 'lightbox-overlay';
	overlay.innerHTML = `
		<div class="lightbox-content">
			<button class="lightbox-close">×</button>
			<img src="" alt="Просмотр диплома">
			<div class="lightbox-nav">
				<button class="lightbox-btn lb-prev">‹</button>
				<button class="lightbox-btn lb-next">›</button>
			</div>
		</div>`;
	document.body.appendChild(overlay);

	const items = document.querySelectorAll('.diploma-item');
	const imgs = Array.from(items).map(i => i.querySelector('img').src);
	let current = 0;

	const show = (idx) => {
		current = (idx + imgs.length) % imgs.length;
		overlay.querySelector('img').src = imgs[current];
	};

	items.forEach((item, i) => item.addEventListener('click', () => {
		show(i); overlay.classList.add('active'); document.body.style.overflow = 'hidden';
	}));

	overlay.addEventListener('click', e => {
		if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
			overlay.classList.remove('active'); document.body.style.overflow = '';
		}
	});
	overlay.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
	overlay.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
	document.addEventListener('keydown', e => {
		if (!overlay.classList.contains('active')) return;
		if (e.key === 'Escape') { overlay.classList.remove('active'); document.body.style.overflow = ''; }
		if (e.key === 'ArrowLeft') show(current - 1);
		if (e.key === 'ArrowRight') show(current + 1);
	});
});