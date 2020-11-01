import {CookieUtils} from "../utils/cookie.utils";

export class LanguageSwitcher {

	constructor(options) {
		const elem = options.elem;

		elem.addEventListener('click', function (event) {
			const target = event.target;
			if (target.classList.contains('locals__language-btn')) {
				CookieUtils.setCookie('local', target.dataset.local);
				location.reload();
			}
		});
	}
}
