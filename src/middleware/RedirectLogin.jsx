import React, { useEffect } from 'react';

const RedirectToLogin = () => {
  useEffect(() => {
    window.location.replace('/login');
  }, []);

  return null;
};

export default RedirectToLogin;
