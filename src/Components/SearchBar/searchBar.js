import React from 'react';
import './searchBar.css';
import '../../util/Spotify';

export class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {
            term: ''
        }
    }
    
    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }
    
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <label className="switch">
                    <input className="switch-input" type="checkbox" onChange={this.props.onToggle}/>
                    <span className="switch-label" data-on="Podcasts" data-off="Tracks"></span> 
                    <span className="switch-handle"></span> 
                </label>
                <br></br>
                <br></br>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}