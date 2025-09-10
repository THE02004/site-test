async function fetchProxy(endpoint) {
  const baseUrl = 'http://localhost:3000/api';
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Proxy API error: ${response.status}`);
  }
  return response.json();
}

async function loadRankings() {
  try {
    // Maintenant on tape ton proxy : /api/lol/teams
    const teams = await fetchProxy('/lol/teams');
    const tbody = document.querySelector('#ranking-body');
    const labels = [];
    const scores = [];

    tbody.innerHTML = ""; // reset tableau

    teams.slice(0, 10).forEach((team, index) => {
      const rank = index + 1;
      const score = team.stats ? team.stats.wins ?? 0 : 0; // PandaScore n’a pas "ranking"
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${rank}</td><td>${team.name}</td><td>${score}</td>`;
      tbody.appendChild(tr);

      labels.push(team.acronym || team.name);
      scores.push(score);
    });

    const ctx = document.getElementById('rankingChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Score',
          data: scores,
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  } catch (err) {
    console.error('Erreur chargement classement:', err);
    const tbody = document.querySelector('#ranking-body');
    tbody.innerHTML = '<tr><td colspan="3">Classement indisponible</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', loadRankings);
