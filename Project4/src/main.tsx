import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import a PrimeReact theme
import 'primereact/resources/primereact.min.css';            // Import PrimeReact core styles
import 'primeicons/primeicons.css';                          // Import PrimeIcons styles

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
