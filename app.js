const apiKey = '<your giphy developer api key here>';
const api = 'https://api.giphy.com/v1/gifs/trending'

const main = document.querySelector('.container');

function createMeme(meme) {
    return `<div class="meme">
        <a href='${meme.url}'>
              <img 
              src='${meme.images.downsized_medium.url}' 
              alt='${meme.title}'
              height='${meme.images.downsized_medium.height}'
              width='${meme.images.downsized_medium.width}'/>
        </a>
        </div>`
}

async function fetchTrending() {
    const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`);
    const json = await res.json();

    main.innerHTML = json.data.map(createMeme).join('\n');
}

window.addEventListener('load', async e => {
    await fetchTrending();

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.log('SW registered');

        } catch (error) {
            console.log('SW failed');

        }
    }
});

