import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add a request interceptor to handle CSRF token
axios.interceptors.request.use(function (config) {
    // Get the CSRF token from the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
    }
    return config;
}); 