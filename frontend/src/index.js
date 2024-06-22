import 'bulma/css/bulma.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home';
import Layout from "./components/Layout";
import { ThemeManager } from './components/ThemeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeManager>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeManager>
);
