import './style.css';

import {wrapper} from './pages/summary';
import {handler} from './pages/summary';

class Popup {
	constructor(container) {
		this.container = container;
		this.popupElement = this.create();
		this.container.appendChild(this.popupElement);
		this.addListeners();
	}

	create() {
		const stringHTML = `<div class="popup__container">
				<img class="popup__close" src="../public/img/close.svg" alt="иконка закрытия окна">
				<h2 class="title"><span>Вход</span> <span class="title_thin">/</span> <span class="title_thin">Регистрация</span></h2>
				<form name="login" class="form">
					<label>Почта:</label>
						<input type="email" name="login" placeholder="user@mail" required>
						<label>Пароль:</label>
						<input type="password" name="password" placeholder="Pass" minlength="5" required>
						<a href="#">Не помню пароль</a>
						<button class="button popup__button button_long button_accent" type="submit">Вход</button>
				</form>
			</div>`;
		
		const template = document.createElement('div');
		template.classList.add('popup');
		template.insertAdjacentHTML('beforeend', stringHTML);

		return template;
	}

	addListeners() {
		this.popupElement.querySelector('.popup__close').addEventListener('click', Popup.close);

		document.forms.login.addEventListener('submit', function(event) {
			event.preventDefault();
			const btnStyle = document.querySelector('#btnLogin').style.backgroundColor;
			document.querySelector('#btnLogin').textContent = document.forms.login.login.value;

			document.querySelector('#btnLogin').addEventListener('mouseover', function() {
				document.querySelector('#btnLogin').style.background = 'var(--maincolor) url("../public/img/selectarrow.svg") no-repeat 95% 50%';
			});
			document.querySelector('#btnLogin').addEventListener('mouseout', function() {
				document.querySelector('#btnLogin').style.background = btnStyle;
			});

			Popup.close();
		});
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


