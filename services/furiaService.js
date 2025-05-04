const { HLTV } = require('hltv');

const FURIA_ID = 8297;

async function getFuriaTeamData() {
  return await HLTV.getTeam({ id: FURIA_ID });
}

async function getRanking() {
  const team = await getFuriaTeamData();
  return team.rank ? `#${team.rank}` : "Sem posição atual no ranking. 🤯";
}

async function getLineup() {
  const team = await getFuriaTeamData();
  return team.players.map(player => {
    const ativo = player.type;
    if (ativo === 'Coach') {
      return `• ${player.name} – Treinador`;
    }
    if (ativo === 'Starter') {
      return `• ${player.name} – Titular`;
    }
    if (ativo === 'Benched') {
      return `• ${player.name} – Banco`;
    }
  }).join('\n');
}

async function getLastMatches() {
  const results = await HLTV.getResults({ teamIds: [FURIA_ID], startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) });
  if (!results || results.length === 0) return 'Não encontrei resultados recentes. 😔';

  return results.slice(0, 5).map(result => {
    const furiaIsTeam1 = result.team1.id === FURIA_ID;
    const furiaScore = furiaIsTeam1 ? result.result.team1 : result.result.team2;
    const opponentScore = furiaIsTeam1 ? result.result.team2 : result.result.team1;
    const furiaWon = furiaScore > opponentScore;

    const prefix = furiaWon ? '❌' : '✅';
    const format = result.format || 'unknown';
    const mapStr = format.toLowerCase() !== 'bo3' ? ` – Mapa: ${result.map}` : '';

    return `${prefix} ${result.team1.name} ${result.result.team1} 🆚 ${result.result.team2} ${result.team2.name} (${format})${mapStr}`;
  }).join('\n');
}

async function getUpcomingEvents() {
  const futureEvents = await HLTV.getEvents({ attendingTeamIds: FURIA_ID });
  if (futureEvents.length === 0) return 'Nenhum campeonato futuro confirmado.';
  return futureEvents.map(n => {
    const dateStartFormated = new Date(n.dateStart).toLocaleDateString();
    const dateEndFormated = new Date(n.dateEnd).toLocaleDateString();
    let prizePool = n.prizePool;
    if (n.prizePool === 'Other') {
      prizePool = 'Não informado';
    }
    return `🏆 ${n.name} \n📅 ${dateStartFormated} - ${dateEndFormated} \n🚩 ${n.location.name} - ${n.location.code} \n💵 ${prizePool}`;
  }).join('\n\n');
}

module.exports = {
  getFuriaTeamData,
  getRanking,
  getLineup,
  getLastMatches,
  getUpcomingEvents,
};