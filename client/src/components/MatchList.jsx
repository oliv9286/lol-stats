import React from "react";
import { Match } from "./Match.jsx";

export const MatchList = ({ summoner, matches }) => {
  return matches.map((match, i) => {
    return <Match key={i} summoner={summoner} match={match} />;
  });
};
