import React from "react";
import { Match } from "./Match.jsx";

const normalizeMatchStats = match => {
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

  const gameLength = `${Math.cei(match.gameDuration / 60)} minutes`;
  const KDA = `${matchingPlayer.stats.kills}:${matchingPlayer.stats.deaths}:${
    matchingPlayer.stats.assists
  }`;

  const spell1 = matchingPlayer.spell1;
  const spell2 = matchingPlayer.spell2;
  const championLevel = matchingPlayer.stats.champLevel;

  return {
    winningStatus,
    gameLength,
    KDA,
    spell1,
    spell2
  };
};

export const MatchList = ({ summoner, matches }) => {
  return matches.map((match, i) => {
    // const outcome = match.debugger;
    const outcome = match.playerIdentities;

    const matchStats = normalizeMatchStats(match);

    return (
      <div key={i}>
        <div className="summoner">{summoner.name}</div>
        <div>{isWinning}</div>
        <div>{gameLength}</div>
      </div>
    );
  });
};
