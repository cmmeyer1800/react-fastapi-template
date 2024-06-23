import 'bulma/css/bulma.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './routes/Home';
import Admin from './routes/Admin';
import Layout from "./components/Layout";
import { ThemeManager } from './components/context/ThemeContext';
import { ErrorManager } from './components/context/ErrorContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeManager>
    <ErrorManager>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<></>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </ErrorManager>
  </ThemeManager>
);
