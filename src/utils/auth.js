// Get token from localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Save token to localStorage
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Remove token from localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Get user from localStorage
export const getUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user');
      if (!user || user === 'undefined' || user === 'null') {
        return null;
      }
      return JSON.parse(user);
    } catch (error) {
      // Clear invalid data
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

// Save user to localStorage
export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Remove user from localStorage
export const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

// Logout function
export const logout = () => {
  removeToken();
  removeUser();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check if user is admin
export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};
