import React from 'react';

export class Player extends React.Component{
    render(){
        return (
            <div className="col-3" style={ {margin: "15px"} }>
                <label>Mão {this.props.index}</label>
                <input type="text" 
                    value={this.props.value} 
                    index={this.props.index} 
                    onChange={this.props.onHandValueChange}/>
            </div>
        );
    }
}