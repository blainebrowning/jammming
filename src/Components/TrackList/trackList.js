import React from 'react';
import {Track} from '../Track/Track'
import './trackList.css';

let listItems = [];

export class TrackList extends React.Component {
    
    render() {
        return (
                <div className="TrackList">
                    <ul>{this.props.items.map((item) =>
                        <li key={item.id}>
                        <Track item={item} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                        </li>)}</ul>
                </div>            
        )
    }
}
