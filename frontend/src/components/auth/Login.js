import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { connectToMetamask } from '../../helpers/EthereumHelper';

const Login = () => {
  const navigate = useNavigate();

  const login = async () => {
    const signer = await connectToMetamask();
    if (signer) {
      // Redirect to Role Selection page after successful login
      navigate('/role-select');
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={login}>Login with Metamask</Button>
    </div>
  );
};

export default Login;
