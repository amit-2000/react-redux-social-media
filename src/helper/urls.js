export const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
  getPost: (page = 1, limit = 10) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  login: () => `${API_ROOT}/users/login`,
  signUp: () => `${API_ROOT}/users/signup`,
};
