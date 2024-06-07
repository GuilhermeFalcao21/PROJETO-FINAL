document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('game-id').value;
    const apiKey = '7b2f023a992e4f5cab14679b946968c2'; // Substitua pela sua chave de API

    const url = `https://api.rawg.io/api/games/${gameId}/achievements?key=${apiKey}`;
    console.log('Fetching URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data); // Log the data to inspect the structure
            displayAchievementsData(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});

function displayAchievementsData(data) {
    const achievementsDataDiv = document.getElementById('achievements-data');
    achievementsDataDiv.innerHTML = '';

    if (data && data.results && data.results.length > 0) {
        data.results.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.innerHTML = `
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                <p>Achieved: ${achievement.percent}%</p>
                <img src="${achievement.image}" alt="${achievement.name} image">
            `;
            achievementsDataDiv.appendChild(achievementElement);
        });
    } else {
        achievementsDataDiv.innerHTML = '<p>No achievements found for this game.</p>';
    }
}
