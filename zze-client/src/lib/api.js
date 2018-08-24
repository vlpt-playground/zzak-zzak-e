import client from './client';
import qs from 'qs';

export const getList = ({ cursor, recent, username, tag } = {}) => {
  const query = qs.stringify({
    cursor,
    recent,
    username,
    tag,
  });
  return client.get('/api/tweets?' + query);
};

export const write = ({ text, pass, name }) =>
  client.post('/api/tweets', { text, pass, name });

export const remove = ({ id, pass }) =>
  client.delete(`/api/tweets/${id}/?pass=${pass}`);

export const register = ({ username, password }) =>
  client.post('/api/auth/register', {
    username,
    password,
  });

export const login = ({ username, password }) =>
  client.post('/api/auth/login', {
    username,
    password,
  });

export const checkAuth = () => client.get('/api/auth/check');

export const refreshToken = () => client.post('/api/auth/refresh-token');

export const logout = () => client.post('/api/auth/logout');
