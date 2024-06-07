
const API_KEY = "a89c9b9b8ce849198a96141806f496b2";

const genreMapping = {
    "action": "Ação",
    "adventure": "Aventura",
    "arcade": "Arcade",
    "board-games": "Jogos de Tabuleiro",
    "card": "Cartas",
    "casual": "Casual",
    "educational": "Educacional",
    "family": "Família",
    "fighting": "Luta",
    "indie": "Indie",
    "massively-multiplayer": "Multijogador Massivo",
    "music": "Música",
    "party": "Festa",
    "platformer": "Plataforma",
    "puzzle": "Quebra-cabeça",
    "racing": "Corrida",
    "role-playing-games-rpg": "RPG",
    "shooter": "Tiro",
    "simulation": "Simulação",
    "sports": "Esportes",
    "strategy": "Estratégia",
    "turn-based-strategy-tbs": "Estratégia Baseada em Turnos",
    "tactical": "Tático",
    "quiz-trivia": "Quiz/Trivia",
    "hack-and-slash-beat-em-up": "Hack and Slash/Beat 'em up"
    // Adicione mais gêneros conforme necessário
};

function convertGenre(genre) {
    return genreMapping[genre] || genre;
}

function searchGame() {
    const gameName = document.getElementById('search-input').value;
    if (gameName.trim() === '') {
        alert('Por favor, digite o nome do jogo.');
        return;
    }

 
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(gameName)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar jogo pelo nome');
            }
            return response.json();
        })
        .then(data => {
         
            if (data.results.length > 0) {
              
                const game = data.results[0];
             
                displayGameInfo(game);
            } else {
                console.log(`Nenhum jogo encontrado com o nome "${gameName}"`);
            }
        })
        .catch(error => {
            console.error('Erro na solicitação HTTP:', error);
        });
}


function displayGameInfo(game) {
    const gameInfoDiv = document.getElementById('game-info');
    
  
    const releaseDate = new Date(game.released);
    const formattedReleaseDate = `${releaseDate.getDate()}/${releaseDate.getMonth() + 1}/${releaseDate.getFullYear()}`;
    
   
    const platforms = game.platforms.map(platform => platform.platform.name).join(', ');
    

    const genres = game.genres.map(genre => convertGenre(genre.slug)).join(', ');

    gameInfoDiv.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" alt="${game.name}">
        <p><strong>Ano de Lançamento:</strong> ${formattedReleaseDate}</p>
        <p><strong>Plataformas:</strong> ${platforms}</p>
        <p><strong>Gênero(s):</strong> ${genres}</p>
        <p>${game.description_raw}</p>
        <p><strong>ID do jogo:</strong> ${game.id}</p>
    `;
}
