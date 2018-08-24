export const saveUser = user => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.setItem('user', JSON.stringify(user));
};

export const loadUser = () => {
  if (typeof localStorage === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    return parsed;
  } catch (e) {
    return null;
  }
};

export const clearUser = () => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.removeItem('user');
};
