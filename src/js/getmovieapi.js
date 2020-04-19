Vue.component('movie-detail',{

    props:['movie'],

    template:`
    <div>
    <div>{{movie.Title}}</div>
    <div>{{movie.Year}}</div>
    <img v-bind:src="movie.Poster">
    </div>
    `

}

);

new Vue({
    el:"#getmovieapp",
    data:{
        searchKey:'',
        moviesList:[]
    },

    methods:{

        searchMovies()
        {
            var url = 'http://www.omdbapi.com/?s=' + this.searchKey + '&apikey=8dc936a1&';
            fetch(url)
            .then(response=>response.json())
            .then(data=>{
                this.moviesList=data;
            })
        }
    }
})