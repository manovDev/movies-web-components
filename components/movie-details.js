import {html, render} from 'https://unpkg.com/lit-html?module';
import {movieService} from '../services/movieService.js';
import {authService} from '../services/authServices.js';

const template = (ctx) => html`
    <div class="container">
        <div class="row bg-light text-dark">
        <h1>${ctx.title}</h1>
            
            <div class="col-md-8">
                <img class="img-thumbnail" src="${ctx.imageUrl}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${ctx.description}</p>
                ${ctx.creator == ctx.user.email
                    ? html`
                    <a class="btn btn-danger" href="/delete/${ctx.key}">Delete</a>
                    <a class="btn btn-warning" href="/edit/${ctx.key}">Edit</a>
                    `
                    : html`
                    <a class="btn btn-primary" href="/like/${ctx.key}">Like</a>
                    <span class="enrolled-span">Liked 1</span>
                    `
                }
            </div>
        </div>
    </div>
`;

class MovieDetails extends HTMLElement {
    constructor() {
        super();

        this.user = authService.getData();
    }

    connectedCallback() {
        movieService.getOne(this.location.params.id)
            .then(data => {
                console.log(data);
                
                Object.assign(this, data);
                this.render();
            })
        this.render();
    }

    render() {
        render(template(this), this, {eventContext: this});
    }
}

export default MovieDetails;

