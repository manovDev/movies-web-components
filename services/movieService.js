const baseUrl = 'https://movies-components-default-rtdb.firebaseio.com/';

export const movieService = {
    async add(movieData) {
        
        movieData = {likes: [0], ...movieData};
        let res = await fetch(`${baseUrl}/movies.json`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movieData),
        });

        let data = await res.json();

        return data;
    },
    async getAll() {
        let res = await fetch(`${baseUrl}/movies.json`);
        
        let data = await res.json();
        
        if(!data) return;

        return Object.keys(data).map(key => Object.assign(data[key], {key}));
    },
    async getOne(id) {
        let res = await fetch(`${baseUrl}/movies/${id}.json`);
        
        let data = await res.json();
        
        return {
            isCreator: Boolean(data.creator == authService.getData().email),
            isLiked: Boolean(data.likes.includes(authService.getData().email)),
            likesQtty: data.likes.length,
            key: id,
            ...data
        };
    },
    async del(id) {
        let res = await fetch(`${baseUrl}/movies/${id}.json`, {
            method: 'DELETE',
        });
        
        let data = await res.json();

        return data;
    },
    async edit(newData, id) {
        let res = await fetch(`${baseUrl}/movies/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(newData),
        });
        
        let data = await res.json();

        return data;
    },
    async like(email, id) {
        let resGet = await fetch(`${baseUrl}/movies/${id}.json`);

        let dataLike = await resGet.json();
        dataLike = dataLike.likes;
        
        let updatedInfo = dataLike[0] == 0 ? {likes: [email]} : {likes: [email, ...dataLike]};
        let resPatch = await fetch(`${baseUrl}/movies/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(updatedInfo),
        });

        let data = await resPatch.json();

        return data;
    },
};