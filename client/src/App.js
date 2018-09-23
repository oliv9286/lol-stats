import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { MatchList } from "./components/MatchList";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      summoner: null,
      searchTerm: "olives86"
    };

    this.fetchMatchesBySommonerId = this.fetchMatchesBySommonerId.bind(this);
  }

  fetchMatchesBySommonerId = async () => {
    //TODO: switch to path here
    const matchData = await axios
      .get(`/summoner/${this.state.searchTerm}`)
      .then(resp => resp.data);

    const matchIDs = await matchData.matchList.matches
      .map(match => match.gameId)
      .map(id => {
        return axios.get(`/matches/${id}`);
      });

    const matchesResponses = await axios.all(matchIDs);

    const matches = matchesResponses.map(resp => {
      return resp.data.match;
    });

    this.setState({
      matches,
      summoner: matchData.summoner
    });
  };

  render() {
    return (
      <div className="App">
        <h1>League of Legends Match Stats</h1>
        <SearchBar
          onClick={this.fetchMatchesBySommonerId}
          searchTerm={this.state.searchTerm}
          onChange={e => {
            this.setState({ searchTerm: e.target.value });
          }}
        />
        <MatchList
          summoner={this.state.summoner}
          matches={this.state.matches}
        />
        <p>{this.state.searchTerm}</p>
      </div>
    );
  }
}

export default App;
