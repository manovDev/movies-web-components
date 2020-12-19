import {Router} from 'https://unpkg.com/@vaadin/router';

const root = document.getElementById('root');
const router = new Router(root);

router.setRouter([
    {
        path: '/',
        components: 'home-component',
    }, 
    {
        path: '/register',
        components: 'register-component',
    }
]);