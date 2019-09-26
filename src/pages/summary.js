export const wrapper = document.querySelector('#wrapper');

export const handelr = (function() {
	if (document.querySelector('#connect')) {
		document.querySelector('#connect').addEventListener('click', function() {
			wrapper.style.maxHeight = '500px';
			for (let a of wrapper.querySelectorAll('a')) {
				a.style.mixBlendMode = 'unset';
			}
			document.querySelector('#connect').style.backgroundColor = 'var(--maincolor)';
			document.querySelector('#connect').style.color = 'var(--accentcolor)';
			document.querySelector('#connect').style.boxShadow = 'none';
		});
	}
})();