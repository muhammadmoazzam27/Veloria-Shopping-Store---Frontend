import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppProvider from './hooks/AppProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#1d3557' }, components: { Button: { controlOutlineWidth: 0 } } }}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
