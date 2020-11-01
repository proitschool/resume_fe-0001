export class CookieUtils {

	static setCookie(key, value) {
		document.cookie = `${key}=${value}`;
	}
}
