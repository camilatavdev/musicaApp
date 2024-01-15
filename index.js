const imagem = document.getElementById('capa'),
    titulo = document.getElementById('titulo-musica'),
    artista = document.getElementById('artista-musica'),
    tempoAtual = document.getElementById('tempo-atual'),
    duracaoMsc = document.getElementById('duracao'),
    progresso = document.getElementById('progresso'),
    playerProgresso = document.getElementById('player-progresso'),
    botaoAnterior = document.getElementById('anterior'),
    botaoProximo = document.getElementById('proximo'),
    botaoPlay = document.getElementById('play'),
    background = document.getElementById('bg-img');

const musica = new Audio();

const songs = [
    {
        caminho: '1.mp3',
        displayName: 'Standing Next to You',
        capa: '1.jpg',
        artista: 'Jungkook',
    },
    {
        caminho: '2.mp3',
        displayName: 'Like Crazy',
        capa: '2.jpg',
        artista: 'Jimin',
    },
    {
        caminho: '3.mp3',
        displayName: 'People',
        capa: '3.jpg',
        artista: 'Agust-D',
    },
    {
        caminho: '4.mp3',
        displayName: 'Love Me Again',
        capa: '4.jpg',
        artista: 'V',
    },
    {
        caminho: '5.mp3',
        displayName: 'Astronaut',
        capa: '5.jpg',
        artista: 'Jin',
    },
    {
        caminho: '6.mp3',
        displayName: 'Daydream',
        capa: '6.jpg',
        artista: 'jhope',
    },
    {
        caminho: '7.mp3',
        displayName: 'Lonely',
        capa: '7.jpg',
        artista: 'RM',
    }
];

let musicIndex = 0;
let tocando = false;

function alterarReproducao() {
    if (tocando) {
        pausarMusica();
    } else {
        tocarMusica();
    }
}

function tocarMusica() {
    tocando = true;
    botaoPlay.classList.replace('fa-play', 'fa-pause');
    botaoPlay.setAttribute('titulo', 'Pause');
    musica.play();
}

function pausarMusica() {
    tocando = false;
    botaoPlay.classList.replace('fa-pause', 'fa-play');
    botaoPlay.setAttribute('titulo', 'Play');
    musica.pause();
}

function carregarMusica(song) {
    musica.src = song.caminho;
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    imagem.src = song.capa;
    background.src = song.capa;
}

function mudarMusica(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    carregarMusica(songs[musicIndex]);
    tocarMusica();
}

function atualizarBarraProgresso() {
    const { duration, currentTime } = musica;
    const progressPercent = (currentTime / duration) * 100;
    progresso.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    duracaoMsc.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    tempoAtual.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function posicaoReproducao(e) {
    const larguraBarra = playerProgresso.clientWidth;
    const clickX = e.offsetX;
    musica.currentTime = (clickX / larguraBarra) * musica.duration;
}

botaoPlay.addEventListener('click', alterarReproducao);
botaoAnterior.addEventListener('click', () => mudarMusica(-1));
botaoProximo.addEventListener('click', () => mudarMusica(1));
musica.addEventListener('ended', () => mudarMusica(1));
musica.addEventListener('timeupdate', atualizarBarraProgresso);
playerProgresso.addEventListener('click', posicaoReproducao);

carregarMusica(songs[musicIndex]);
