import React from 'react';
import './Track.css';

export class Track extends React.Component {
    
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(isRemoval){
        if (isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
        return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    addTrack() {
        this.props.onAdd(this.props.item);
    }

    removeTrack() {
        this.props.onRemove(this.props.item);
    }

    render() {
        return (
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.item.name}</h3>
                <p>{this.props.item.artist} | {this.props.item.album}</p>
            </div>
            {this.renderAction(this.props.isRemoval)}
            </div>
        )
    }
}
        