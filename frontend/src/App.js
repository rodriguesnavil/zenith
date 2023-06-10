import React from 'react';
import Routes from './Routes';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
    <Routes />
    </UserProvider>
  );
}

export default App;