import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: "New Playlist"
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist() {
    const playlistTracks = this.state.playlistTracks;
    const input = document.getElementById("Playlist-input");
    const trackURIs = playlistTracks.map(currTrack => currTrack.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
      input.value = this.state.playlistName;
    });
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    const output = tracks.find(currTrack => currTrack.id === track.id);

    if (!output) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    const filteredTracks = tracks.filter(
      currTrack => currTrack.id !== track.id
    );
    this.setState({ playlistTracks: filteredTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              addTrack={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              defaultPlaylistName={this.state.defaultPlaylistName}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
