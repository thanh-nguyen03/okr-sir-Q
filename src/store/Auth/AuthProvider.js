import { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
