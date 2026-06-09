import { ViewState } from './types';

export function getViewHref(view: ViewState, params?: Record<string, unknown>) {
  const pathByView: Record<ViewState, string> = {
    home: '/',
    services: '/services',
    booking: '/booking',
    about: '/about',
    areas: '/areas',
    contact: '/contact',
  };

  const url = new URL(pathByView[view], 'http://localhost');

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return `${url.pathname}${url.search}`;
}
