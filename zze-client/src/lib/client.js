import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '/'
      : 'https://zzakzzak-e.vlpt.us/api/tweets',
});


export default client;