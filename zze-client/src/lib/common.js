/**
 * 로컬 스토리지에 유저 정보를 저장합니다.
 */
export const saveUser = user => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * 로컬 스토리지에서 유저 정보를 불러옵니다.
 */
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

/**
 * 로컬 스토리지에 유저 정보를 제거합니다.
 */
export const clearUser = () => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.removeItem('user');
};
