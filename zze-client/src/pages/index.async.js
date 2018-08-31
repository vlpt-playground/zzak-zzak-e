import asyncComponent from 'lib/asyncComponent';

export const TweetsPage = asyncComponent(() => import('./TweetsPage'));
export const AuthPage = asyncComponent(() => import('./AuthPage'));
export const NotFoundPage = asyncComponent(() => import('./NotFoundPage'));
