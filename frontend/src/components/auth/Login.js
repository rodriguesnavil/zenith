import React,{useContext} from 'react';
import Button from '@mui/material/Button';
import { json, useNavigate } from 'react-router-dom';
import { connectToMetamask } from '../../helpers/EthereumHelper';
import Box from '@mui/material/Box';
import { getUser } from '../../services/ApiService';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAddress } = useContext(UserContext); // Get setAddress from context

  const login = async () => {
    const signer = await connectToMetamask();
    if (signer) {
      const address = await signer.getAddress();
      setAddress(address); // Set address in context
      localStorage.setItem('address', address);
      const response = await getUser(address);
      console.log("result ",JSON.stringify(response));
      console.log("result ",response.user != null);
      console.log("result string ",JSON.stringify(response.user));
      if (response.data.user != null) {
        // Redirect to Role Selection page after successful login
        navigate('/role-select');
      } else {
        // Redirect to Register page if user doesn't exist
        navigate('/register', { state: { address } });
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Full height of the viewport
    >
      <Button variant="contained" color="primary" onClick={login}>Login with Metamask</Button>
    </Box>
  );
};

export default Login;
