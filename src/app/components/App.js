import React from 'react';
import {Header} from './header/Header';
import {Options} from './options/Options';
import {Hand} from './hand/Hand';


export class App extends React.Component{
    constructor(props) {
        super();
        this.state = {
            numberOfHands: 2,
            hands: ["", ""]
        };        
    }
    onNumberOfHandsChange(event){
        var newHands = [];
        var hands = this.state.hands.length
        var size = event.target.value;
        for (var index = 0; index < size; index++) {           
            
            if(hands <= index){
                newHands.push(this.state.hands[index]);
                console.log("has");
            }else{
                newHands.push("");
                console.log("new");
            }
        }
        this.setState({
            numberOfHands: size,
            hands: newHands
        });
        console.log(this.state.hands);
    }

    
    
    render(){
        var Hands = this.state.hands.map((hand, index) => {
            <Hand key={index} value={hand}/>
        });

        return (
            <div className="container">
                <Header/>  
                <Options numberOfHands={this.state.numberOfHands} 
                         onNumberOfHandsChange={this.onNumberOfHandsChange.bind(this)}/>

                {Hands}
                
            </div>
        );
    }
}
