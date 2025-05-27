import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App';

import './style/null.scss';
import './style/style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
