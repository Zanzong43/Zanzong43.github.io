
const API_KEY= 'a3f41888f2daaab89f43deec96a8bcfa';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=a3f41888f2daaab89f43deec96a8bcfa&language=en-US&page=1&include_adult=false';


const buttonElement = document.querySelector('#search') ;
const inputElement = document.querySelector('#inputValue');

const movieSearchable = document.querySelector('#movies-searchable');



function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=a3f41888f2daaab89f43deec96a8bcfa&language=en-US&page=1&include_adult=false`;

    return url;
}


function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path){
            return `<img 
            src=${IMAGE_URL + movie.poster_path} 
            data-movie-id=${movie.id}
            />`;
        }
   })
}


function createMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="section">
           ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">Click to close trailer section</p>
        </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;

}

function renderSearchMovies(data){
    movieSearchable.innerHTML='';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data', data);
}





buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie';
    const newUrl = url + generateUrl(path) + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error: ', error)
        });
    inputElement.value = '';

    console.log('Value:', value);
}

function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}


document.onclick=function(){
    const target = event.target
    if (target.tagName.toLowerCase() === 'img'){
        const movieID = target.dataset.movieId;
        console.log(movieID);
        const section = event.target.parentElement; //get parent
        const content = section.nextElementSibling;
        content.classList.add('content-show');

        const path = `/movie/${movieID}/videos`;
        const url =  generateUrl(path);
        fetch(url)
            .then((res) => res.json())
            .then((data) =>{
                content.innerHTML='<p id="content-close">Click to close trailer section</p>';
                console.log('videos: ' + data);
                const videos= data.results;
                const iframeContainer=document.createElement('div');
                
                const video =videos[0];
                const iframe=createIframe(video);
                iframeContainer.appendChild(iframe);
                content.appendChild(iframeContainer);
            })

            .catch((error) => {
                console.log('Error: ', error)
            });

        
    }
    
    if(target. id==='content-close'){
        const content = target.parentElement;
        content.classList.remove('content-show');
    }


}
