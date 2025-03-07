const matchContainer = document.getElementById('match');

const API = '1e94a1ec-5bc9-431c-abf0-62e46e6a55b9';
const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API}`;

async function getMatches() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const matches = data.data;
        if (!matches) return [];
        renderData(matches);
    } catch (e) {
        console.log("error", e);
    }
}

function renderData(matches) {
    const matchList = matches.map(match => {
       
        const team1 = match.teamInfo && match.teamInfo[0] ? match.teamInfo[0] : {};
        const team2 = match.teamInfo && match.teamInfo[1] ? match.teamInfo[1] : {};
        const score1 = match.score && match.score[0] ? match.score[0] : {};
        const score2 = match.score && match.score[1] ? match.score[1] : {};
        const status = match.status || "No status available";

        return `
            <li class="match-card">
                <div class="team">
                    <img src="${team1.img || ''}" alt="${team1.name || 'Team 1'}" class="team-logo">
                    <div class="team-details">
                        <span class="team-name">${team1.shortname || 'N/A'}</span>
                        <span class="team-score">${score1.r || 0}/${score1.w || 0}</span>
                    </div>
                </div>
                <div class="status">${status}</div>
                <div class="team">
                    <div class="team-details">
                        <span class="team-name">${team2.shortname || 'N/A'}</span>
                        <span class="team-score">${score2.r || 0}/${score2.w || 0}</span>
                    </div>
                    <img src="${team2.img || ''}" alt="${team2.name || 'Team 2'}" class="team-logo">
                </div>
            </li>
        `;
    }).join('');
    matchContainer.innerHTML = matchList;
}

getMatches();
