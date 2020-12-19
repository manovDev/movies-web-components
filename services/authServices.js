const apiKey = 'AIzaSyCYTcQtSEWkPl2cx_8hKuxLxCOElUSxk5Q';
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const baseUrl = 'https://movies-components-default-rtdb.firebaseio.com/';

export const authService = {
    async login(email, password) {
        let response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if(response.status != 200) return;
        
        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));
        
        return data;
    },
    async register(email, password, rePassword) {
        let response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                rePassword
            })
        });

        let data = await response.json();

        return data;
    },

    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isLogged: Boolean(data.idToken),
                email: data.email || '',
            }
        } catch (error) {
            return {
                isLogged: false,
                email: '',
            }
        }
        
    },
    
    logout() {
        localStorage.removeItem('auth');
    }
};