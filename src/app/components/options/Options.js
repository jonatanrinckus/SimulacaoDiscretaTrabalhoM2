import React from 'react';

export class Options extends React.Component{
    render(){
        return (
            <div className="row">
                <input type="number" onChange={this.props.onNumberOfHandsChange} value={this.props.numberOfHands}/>
                {this.props.numberOfHands}
            </div>
        );
    }
}