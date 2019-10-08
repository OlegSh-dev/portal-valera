import './style.css';

import {wrapper} from './pages/summary';
import {handler} from './pages/summary';



const changeCondition = () => {
	document.querySelector('#login').classList.toggle('title_thin');
	document.querySelector('#register').classList.toggle('title_thin');

	document.forms.login.classList.toggle('hidden');
	document.forms.register.classList.toggle('hidden');
}

const closePopup = () => {
	document.querySelector('.popup').classList.add('hidden');
	document.forms.login.classList.add('hidden');
	document.forms.register.classList.add('hidden');

	document.querySelector('#login').classList.remove('title_thin');
	document.querySelector('#register').classList.add('title_thin');


	document.forms.login.reset();
	document.forms.register.reset();
}

const makeFakeLogin = () => {
	const btnLogin = document.querySelector('#btnLogin');
	const btnStyle = btnLogin.style.backgroundColor;

	btnLogin.textContent = document.forms.login.login.value;

	btnLogin.addEventListener('mouseover', function() {
		btnLogin.style.background = 'var(--maincolor) url("../build/images/selectarrow.svg") no-repeat 95% 50%';
	});
	btnLogin.addEventListener('mouseout', function() {
		btnLogin.style.background = btnStyle;
	});
}

const addListenersToPopup = () => {
	const popupClose = document.querySelector('.popup__close');
	const popupContainer = document.querySelector('.popup__container');

	// закрытие попапа
	popupClose.addEventListener('click', closePopup);

	document.querySelector('.popup').addEventListener('click', (event) => {
		if (!event.target.classList.contains('popup')) {
			return;
		}
		closePopup();
	});
	
	// переключение между входом и регистрацией
	popupContainer.querySelector('#register').addEventListener('click', function() {
		if (!document.forms.register.classList.contains('hidden')) {
			return;
		}

		changeCondition();
	});

	popupContainer.querySelector('#login').addEventListener('click', function() {
		if (!document.forms.login.classList.contains('hidden')) {
			return;
		}

		changeCondition();
	});
}

// имитация залогинивания на сайте по сабмиту формы логина
if (document.forms.login) {
	document.forms.login.addEventListener('submit', function(event) {
		event.preventDefault();
		makeFakeLogin();
		closePopup();
	});
}

if (document.querySelector('#btnLogin')) {
	document.querySelector('#btnLogin').addEventListener('click', function() {
		if (document.querySelector('#btnLogin').textContent === 'Войти') {
			document.querySelector('.popup').classList.remove('hidden');
			document.forms.login.classList.remove('hidden');
			addListenersToPopup();
		} else {
			document.querySelector('.contmenu').classList.toggle('hidden');
		}
	});
}

if (document.querySelector('#logout')) {
	document.querySelector('#logout').addEventListener('click', function() {
		window.location.reload();
	});
}


