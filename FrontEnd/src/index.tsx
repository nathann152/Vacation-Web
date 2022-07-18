import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import interceptorService from './Services/InterceptorService';



interceptorService.createInterceptor()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

     <BrowserRouter>
       <Layout/>
     </BrowserRouter>   
    
  </React.StrictMode>
);

reportWebVitals();
