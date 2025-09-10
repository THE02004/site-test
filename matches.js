const API_TOKEN = "W4FBc_KPgNhEBeKAz1sdkPpqHYtEIQj9ZRE1R3ing_ASYpFkoAE";

async function loadMatches(game) {
  const list = document.getElementById('matches');
  if (!list) return;
  try {
    const response = await fetch(`https://api.pandascore.co/${game}/matches/upcoming?per_page=10&token=${API_TOKEN}`);
    if (!response.ok) {
      throw new Error('API error');
    }
    const matches = await response.json();
    list.innerHTML = '';
    matches.forEach(match => {
      const tournament = match.tournament?.name || 'Tournoi inconnu';
      const opponents = match.opponents || [];
      const team1 = opponents[0]?.opponent?.name || 'TBD';
      const team2 = opponents[1]?.opponent?.name || 'TBD';
      const date = match.begin_at ? new Date(match.begin_at).toLocaleString('fr-FR') : 'Date non définie';
      let score = 'À venir';
      if (match.results && match.results.length >= 2) {
        score = `${match.results[0].score} - ${match.results[1].score}`;
      }
      const li = document.createElement('li');
      li.textContent = `${team1} vs ${team2} — ${tournament} — ${date} — ${score}`;
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = '<li>Erreur de chargement des matchs</li>';
    console.error(error);
  }
}