// Import necessary dependencies from React and Material-UI
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';

// Define the Login component
const Login = () => {
  // Use the useNavigate hook for programmatic navigation
  const navigate = useNavigate();
  // Create state variables for email and password using useState hook
  // These will store the user's input and update as they type
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define the login handler function
  // This function is called when the form is submitted
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      // Send a POST request to the login API
      // We use fetch API to make the HTTP request
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({ email, password }), // Convert the data to JSON string
      });

      // Check if the response is successful
      if (response.ok) {
        // If successful, parse the JSON response
        const data = await response.json();
        
        // Store the received token in localStorage for future authenticated requests
        localStorage.setItem('token', data.token);
        
        // Navigate to the home page after successful login
        navigate('/');
      } else {
        // If the response is not ok, you might want to handle different error scenarios here
        console.error('Login failed');
        // You could set an error state here and display it to the user
      }
    } catch (error) {
      // Catch and log any errors that occur during the login process
      console.error('Login error:', error);
      // You could set an error state here and display it to the user
    }
  };

  // Render the login form
  return (
    // Use Box component as a container with full height minus the navbar height
    <Box sx={{ 
      height: 'calc(100vh - 64px)', // Full viewport height minus navbar height
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: 'background.default' // Use the default background color from the theme
    }}>
      {/* Use Paper component to create a card-like container for the form */}
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        {/* Title of the login form */}
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Login
        </Typography>
        
        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Email input field */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            sx={{ mb: 2 }} // Add margin at the bottom
            required // Make this field required
          />
          
          {/* Password input field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            sx={{ mb: 3 }} // Add margin at the bottom
            required // Make this field required
          />
          
          {/* Submit button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mb: 2 }} // Add margin at the bottom
          >
            Login
          </Button>
          
          {/* Link to registration page */}
          <Box sx={{ textAlign: 'center' }}>
            <Link 
              href="#" 
              onClick={() => navigate('/register')} // Navigate to registration page on click
            >
              Don't have an account? Sign up
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

// Export the Login component as the default export
export default Login;
