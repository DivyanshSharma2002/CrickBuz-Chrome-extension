const matchContainer = document.getElementById('match');

const API = '1e94a1ec-5bc9-431c-abf0-62e46e6a55b9';
const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API}`;

async function getMatches() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const matches = data.data;
        if (!matches) return [];
        renderData(matches);
    } catch (e) {
        console.log("error", e);
    }
}

function renderData(matches) {
    const matchList = matches.map(match => `
        <li class="match-card">
            <div class="team">
                <img src="${match.teamInfo[0].img}" alt="${match.teamInfo[0].name}" class="team-logo">
                <div class="team-details">
                    <span class="team-name">${match.teamInfo[0].shortname}</span>
                    <span class="team-score">${match.score[0]?.r}/${match.score[0]?.w}</span>
                </div>
            </div>
            <div class="status">${match.status}</div>
            <div class="team">
                <div class="team-details">
                    <span class="team-name">${match.teamInfo[1].shortname}</span>
                    <span class="team-score">${match.score[1]?.r}/${match.score[1]?.w}</span>
                </div>
                <img src="${match.teamInfo[1].img}" alt="${match.teamInfo[1].name}" class="team-logo">
            </div>
        </li>
    `).join('');
    matchContainer.innerHTML = matchList;
}

getMatches();
