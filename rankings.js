async function fetchPandaScore(endpoint) {
   const token = typeof PANDASCORE_TOKEN !== 'undefined' ? PANDASCORE_TOKEN : '';// TODO: move token to environment variable
  const baseUrl = 'https://api.pandascore.co';
const url = `${baseUrl}${endpoint}?token=${token}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PandaScore API error: ${response.status}`);
  }
  return response.json();
}

async function loadRankings() {
  try {
    const teams = await fetchPandaScore('/lol/teams?sort=-ranking');
    const tbody = document.querySelector('#ranking-body');
    const labels = [];
    const scores = [];

    teams.slice(0, 10).forEach((team, index) => {
      const rank = team.ranking ?? index + 1;
      const score = team.score ?? team.rating ?? 0;
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
        plugins:{legend:{display:false}},
        scales:{y:{beginAtZero:true}}
      }
    });
  } catch (err) {
    console.error('Erreur chargement classement:', err);
    const tbody = document.querySelector('#ranking-body');
    tbody.innerHTML = '<tr><td colspan="3">Classement indisponible</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', loadRankings);