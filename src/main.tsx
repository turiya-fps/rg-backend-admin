import { StrictMode } from 'react';
import { createRoot as mount } from 'react-dom/client';
import { Application } from './features/Application';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;

mount(container).render(
  <StrictMode>
    <Application />
  </StrictMode>,
);
