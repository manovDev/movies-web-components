const apiKey = 'AIzaSyCYTcQtSEWkPl2cx_8hKuxLxCOElUSxk5Q';
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

export const authService = {
    async login(email, password) {
        let response = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });

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