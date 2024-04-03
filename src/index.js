import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PaginaMeniu from './components/PaginaMeniu/PaginaMeniu';
import PaginaElevi from './components/PaginaElevi/PaginaElevi';
import PaginaProfesori from './components/PaginaProfesori/PaginaProfesori';
import PaginaMateriiScolare from './components/PaginaMateriiScolare/PaginaMateriiScolare';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaginaMeniu />,
  },
  {
    path: "/paginaelevi",
    element: <PaginaElevi />,
  },
  {
    path: "/paginaprofesori",
    element: <PaginaProfesori />,
  },
  {
    path: "/paginamateriiscolare",
    element: <PaginaMateriiScolare />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
