import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  
  const [address, setAddress] = useState(localStorage.getItem('address')); // Fetch address from localStorage

  return (
    <UserContext.Provider value={{ role, setRole, address, setAddress }}>
      {children}
    </UserContext.Provider>
  );
};
