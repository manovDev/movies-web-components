class Home extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 'In Home Component';
    }
};

export default Home;