import React from 'react';

export class Hand extends React.Component{



    render(){
        return (
            <div className="row">
                <input type="text" value={this.props.value} key={this.props.key} onChange={this.props.onHandValueChange}/>
            </div>
        );
    }
}