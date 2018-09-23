import React from "react";
import axios from "axios";

const CHAMP_ICON_BASE_URL =
  "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/";

// This function is a good candidate for testing, esepcially regarding fetching participant name and matching the one that you're looking for
const normalizeMatchStats = (match, summoner) => {
  const matchingParticipantIds = match.participantIdentities
    .filter(function(participant) {
      return participant.player.summonerId === summoner.id;
    })
    .map(participant => participant.participantId);

  const teamId = match.participants
    .filter(participant => {
      return participant.participantId === matchingParticipantIds[0];
    })
    .map(participant => participant.teamId)[0];

  const winningStatus = match.teams
    .filter(team => {
      return team.teamId === teamId;
    })
    .map(team => team.win);

  const isWinning = winningStatus === "Win" ? "Victory" : "Defeat";

  const matchingPlayer = match.participants.filter(participant => {
    return participant.participantId === matchingParticipantIds[0];
  })[0];

  const gameLength = `${Math.ceil(match.gameDuration / 60)} minutes`;
  const KDA = `${matchingPlayer.stats.kills}:${matchingPlayer.stats.deaths}:${
    matchingPlayer.stats.assists
  }`;

  const spell1 = matchingPlayer.spell1Id;
  const spell2 = matchingPlayer.spell2Id;
  const championLevel = matchingPlayer.stats.champLevel;
  const championId = matchingPlayer.championId;
  const items = [
    matchingPlayer.stats.item0,
    matchingPlayer.stats.item1,
    matchingPlayer.stats.item2,
    matchingPlayer.stats.item3,
    matchingPlayer.stats.item4,
    matchingPlayer.stats.item5,
    matchingPlayer.stats.item6
  ];

  // const champions = await axios
  //   .get(
  //     `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
  //   )
  //   .then(resp => resp.data.data);

  // // const matchingChampion = champions.keys();
  // let matchingChampion = null;
  // for (var property in champions) {
  //   if (champions[property].key === championId) {
  //     matchingChampion = champions[property];
  //   }
  // }

  return {
    winningStatus,
    gameLength,
    KDA,
    spell1,
    spell2,
    items,
    championLevel,
    championId
  };
};

export const Match = ({ key, summoner, match }) => {
  const stats = normalizeMatchStats(match, summoner);
  const items = stats.items.forEach(item => {
    return <p>{item}</p>;
  });

  return (
    <div key={key}>
      <div className="summoner">Summoner Name: {summoner.name}</div>
      <div>{stats.isWinning}</div>
      <div>Game Length: {stats.gameLength}</div>
      <div>Items: {items}</div>
      <div>Champion Level: {stats.championLevel}</div>
      <div>Champion Id: {stats.championId}</div>
    </div>
  );
};
