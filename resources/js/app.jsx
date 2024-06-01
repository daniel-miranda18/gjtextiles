import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Pages/Dashboard';

// Configuración de Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.render(<Dashboard />, rootElement);
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'blue',
    },
});
