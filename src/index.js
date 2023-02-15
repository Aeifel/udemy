import React from 'react';
import { useEffect , useState , useMemo ,useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App appInstance={1}/>
);
reportWebVitals();
