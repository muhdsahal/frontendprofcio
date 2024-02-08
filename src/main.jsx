import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GoogleOAuthProvider } from "@react-oauth/google";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ApiProvider } from './context/context.jsx';
import { googleClientID } from './constants/constants.js';
const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1026084967688-s5uu23t8b7mc4rq25ae3is6sm32jiooo.apps.googleusercontent.com'  >
      <ApiProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApiProvider>
  </GoogleOAuthProvider>
)