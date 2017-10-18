import React from 'react';

const divStyle = {
    margin:'15px'
};
export class Options extends React.Component{
    render(){
        return (
            <div style={divStyle} className="col-4">
                <label>Quantidade de mãos: </label>
                <input type="number" 
                onChange={this.props.onNumberOfHandsChange} 
                value={this.props.numberOfHands}/>                
            </div>
        );
    }
}