import 'bulma/css/bulma.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './routes/Home';
import Admin from './routes/admin/Admin';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Layout from "./components/Layout";
import { OAuthManager } from './components/context/OAuthContext';
import { ThemeManager } from './components/context/ThemeContext';
import { ErrorManager } from './components/context/ErrorContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeManager>
    <ErrorManager>
      <OAuthManager>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </OAuthManager>
    </ErrorManager>
  </ThemeManager>
);
