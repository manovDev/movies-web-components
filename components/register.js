import {Router} from 'https://unpkg.com/@vaadin/router';


import {html, render} from 'https://unpkg.com/lit-html?module';
import {authService} from '../services/authServices.js';

const template = (ctx) => html`
    <form class="text-center border border-light p-5" action="#" method="post" @submit="${ctx.onSubmit}">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>
    
        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="rePassword" value="">
        </div>
    
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
`;

class Register extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let rePassword = formData.get('rePassword');
        
        if(password.length < 6) {
            notify('Password is too short!', 'error');
            return;
        }

        if(password != rePassword) {
            notify('Passwords must match!', 'error');
            return;
        }

        authService.register(email, password, rePassword)
            .then(res => {
                notify('Successful registration!', 'success');
                Router.go('/login');
            })
            .catch(e => {
                notify(e.message, 'error');
            });

    }

    render() {
        render(template(this), this, {eventContext: this})
    }

};

export default Register;