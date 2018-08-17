import client from './client';
import qs from 'qs';

export const getList = ({ cursor, recent } = {}) => {
  const query = qs.stringify({
    cursor,
    recent,
  });
  return client.get('/api/tweets?' + query);
};

export const write = ({ text, pass, name }) =>
  client.post('/api/tweets', { text, pass, name });

export const remove = ({ id, pass }) => 
  client.delete(`/api/tweets/${id}/?pass=${pass}`);
