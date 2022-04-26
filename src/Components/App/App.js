//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/searchBar';
import {SearchResults} from '../SearchResults/searchResults';
import {Playlist} from '../Playlist/playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Popping Tracks',
      playlistTracks: [],
      podcastToggle: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.podcastToggle = this.podcastToggle.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const playlist = this.state.playlistTracks;
    playlist.push(track);
    this.setState({
      playlistTracks: playlist})
  }

  removeTrack(track) {
    
    const filteredArray = this.state.playlistTracks.filter(function(value, index, arr) {
      return value.id !== track.id
    });
    
    this.setState({
      playlistTracks: filteredArray
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }
  
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm, this.state.podcastToggle).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  podcastToggle() {
    this.setState({
      podcastToggle: !this.state.podcastToggle
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} onToggle={this.podcastToggle}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }
}

export default App;
