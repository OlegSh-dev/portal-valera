import './style.css';

import {wrapper} from './pages/summary';
import {handler} from './pages/summary';

const imgClose = require('../public/img/close.svg');
const imgCloseHovered = require('../public/img/closehovered.svg');

class Popup {
	constructor(container) {
		this.container = container;
		this.popupElement = this.create();
		this.container.appendChild(this.popupElement);
		this.addListeners();
	}

	create() {
		const stringHTML = `<div class="popup__container">
				<img class="popup__close" src=${imgClose} alt="иконка закрытия окна">
				<h2 class="title"><span id="login">Вход</span> <span class="title_thin">/</span> <span id="register" class="title_thin">Регистрация</span></h2>
				${Popup.createForm()}
			</div>`;
		
		const template = document.createElement('div');
		template.classList.add('popup');
		template.insertAdjacentHTML('beforeend', stringHTML);

		return template;
	}

	static createForm(type) {
		const stringHTMLLogin = `<form name="login" class="form">
				<label>Почта:</label>
				<input type="email" name="login" placeholder="user@mail" required>
				<label>Пароль:</label>
				<input type="password" name="password" placeholder="Pass" minlength="5" required>
				<a href="#">Не помню пароль</a>
				<button class="button popup__button button_long button_accent" type="submit">Вход</button>
			</form>`;
		
		const stringHTMLRegister = `<form name="register" class="form">
				<label>Моя почта:</label>
				<input type="email" name="register" placeholder="user@mail" required>
				<label>Пароль:</label>
				<select name="want" id="want">
					<option value="empty" hidden selected disabled>Найти работу</option>
					<option value="work">Найти работу</option>
					<option value="employee">Найти сотрудника</option>
				</select>
				<label>Откуда узнали о нас?</label>
				<select name="know" id="know">
					<option value="empty" hidden selected disabled>Рассказали друзья</option>
					<option value="friends">Рассказали друзья</option>
					<option value="internet">Из интернета</option>
				</select>
				<button class="button popup__button button_long button_accent" type="submit">Зарегистрироваться</button>
				<p class="popup__policy">Нажимая кнопку “Зарегестрироваться” вы соглашаетесь с <a href="#">политикой конфиденциальности</a></p>
			</form>`;
		
		if (type === 'register') {
			return stringHTMLRegister;
		} else {
			return stringHTMLLogin;
		}
	}

	static changeCondition() {
		document.querySelector('form').remove();

		document.querySelector('#login').classList.toggle('title_thin');
		document.querySelector('#register').classList.toggle('title_thin');
	}

	static fakeLogin() {
		const btnLogin = document.querySelector('#btnLogin');
		const btnStyle = btnLogin.style.backgroundColor;

		btnLogin.textContent = document.forms.login.login.value;

		btnLogin.addEventListener('mouseover', function() {
			btnLogin.style.background = 'var(--maincolor) url("./selectarrow.svg") no-repeat 95% 50%';
		});
		btnLogin.addEventListener('mouseout', function() {
			btnLogin.style.background = btnStyle;
		});
	}

	// имитация залогинивания на сайте по сабмиту формы логина
	static addListenerOnSubmit() {
		document.forms.login.addEventListener('submit', function(event) {
			event.preventDefault();

			Popup.fakeLogin();

			Popup.close();
		});
	}

	addListeners() {
		const popupClose = this.popupElement.querySelector('.popup__close');
		const popupContainer = this.popupElement.querySelector('.popup__container');

		// закрытие попапа
		popupClose.addEventListener('click', Popup.close);
		popupClose.addEventListener('mouseover', function() {
			popupClose.src = imgCloseHovered;
		});
		popupClose.addEventListener('mouseout', function() {
			popupClose.src = imgClose;
		});

		// переключение между входом и регистрацией
		popupContainer.querySelector('#register').addEventListener('click', function() {
			if (document.forms.register) {
				return;
			}

			Popup.changeCondition();

			popupContainer.insertAdjacentHTML('beforeend', Popup.createForm('register'));
		});

		popupContainer.querySelector('#login').addEventListener('click', function() {
			if (document.forms.login) {
				return;
			}

			Popup.changeCondition();

			popupContainer.insertAdjacentHTML('beforeend', Popup.createForm('login'));

			Popup.addListenerOnSubmit();
		});

		Popup.addListenerOnSubmit();
	}

	static close() {
		document.querySelector('.popup').remove();
	}
}



if (document.querySelector('#btnLogin')) {
	document.querySelector('#btnLogin').addEventListener('click', function() {
		if (document.querySelector('#btnLogin').textContent === 'Войти') {
			new Popup(document.querySelector('body'));
		} else {
			document.querySelector('.contmenu').classList.toggle('show');
		}
	});
}

if (document.querySelector('#logout')) {
	document.querySelector('#logout').addEventListener('click', function() {
		window.location.reload();
	});
}


