import * as React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { App } from 'app';
import { Admin } from 'admin';

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
