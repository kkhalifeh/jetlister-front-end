import Cookies from 'js-cookie'

export function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }

  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

export const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-CSRF-Token': Cookies.get('X-App-CSRF-Token')
});