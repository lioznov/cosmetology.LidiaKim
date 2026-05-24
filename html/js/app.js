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


// Выпадающие описания в прайс-листе
function togglePriceDesc(btn) {
    const row = btn.closest('.price-row');
    const descRow = row.nextElementSibling;
    const previewText = btn.getAttribute('data-preview');
    const previewSpan = btn.querySelector('.desc-preview-text');
    const icon = btn.querySelector('.desc-icon');
    
    if (!descRow || !descRow.classList.contains('price-desc-row')) return;
    
    // Проверяем текущее состояние
    const isOpen = descRow.classList.contains('active-desc');
    
    if (isOpen) {
        // Закрываем
        descRow.style.display = 'none';
        descRow.classList.remove('active-desc');
        btn.classList.remove('active');
        if (previewSpan) previewSpan.textContent = previewText;
        if (icon) icon.textContent = '⌄';
    } else {
        // Открываем
        descRow.style.display = 'table-row';
        descRow.classList.add('active-desc');
        btn.classList.add('active');
        if (previewSpan) previewSpan.textContent = 'свернуть';
        if (icon) icon.textContent = '▲';
    }
}