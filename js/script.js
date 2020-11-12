let term = '';
const mainrow = document.getElementById('row');
let UpdateTerm = () => {
    term = document.getElementById('serach_input').value;

    if(!term || term === "" ){
        alert('please type something first')
    }
    else{
        while(mainrow.firstChild){
            mainrow.removeChild(mainrow.firstChild);
        }
    }
    const url= `https://itunes.apple.com/search?&media=music&term=${term}`;
    fetch(url)
    .then((response) => response.json() )
    .then((data) => {
        const artists = data.results;
        return artists.map(result => {
            const article = document.createElement('article'),
                    artist = document.createElement('h5'),
                    song = document.createElement('p'),
                    img = document.createElement('img'),
                    audio = document.createElement('audio'),
                    audioSource = document.createElement('source'),
                    columngrid = document.createElement('div')
                    

                    artist.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    audio.setAttribute('controls', ''); 
                    article.setAttribute("id", "song-body");
                    columngrid.setAttribute("id", "col-md-4")

                    article.appendChild(img)
                    article.appendChild(artist)
                    article.appendChild(song)
                    article.appendChild(audio)
                    audio.appendChild(audioSource)
                    columngrid.appendChild(article)
                    mainrow.appendChild(columngrid)
                    console.log(result)
                    
        })
    })
    .catch(error => console.log('Request Failed:', error))
}

const searchbtn = document.getElementById('searchbtn')
searchbtn.addEventListener("click", UpdateTerm)





const audio = document.getElementByTagName('audio');
document.addEventListener('play', event => {
    for(let i=0; i < audio.lenght; i++){
        if(audio[i] != event.target){
            audio[i].pause();
        }
    }
}, true)