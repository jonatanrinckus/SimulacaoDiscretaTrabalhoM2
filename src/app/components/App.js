import React from 'react';
import { Header } from './header/Header';
import { Options } from './options/Options';
import { Player } from './player/Player';
import { Hand } from 'pokersolver';

const minHands = 2;
const maxHands = 8;

var app;
var handsInitial = ["", ""]

export class App extends React.Component{
    constructor(props) {
        super();
        app = this;
        this.state = {
            numberOfHands: minHands,
            hands: handsInitial
        };        

        this.onHandValueChange = this.onHandValueChange.bind();
    }
    
    onNumberOfHandsChange(event){
        var newHands = [];
        var hands = this.state.hands.length
        var size = event.target.value;
        if(size){
            if(size.length > 1){
                size = size[size.length-1];
            }
            if(size < minHands){
                size = minHands;
            }
    
            if(size > maxHands){

                size = maxHands;
            }
        }
       

        for (var index = 0; index < size; index++) {           
            
            if(hands <= index){
                newHands.push(this.state.hands[index]);                
            }else{
                newHands.push("");
            }
        }
        this.setState({
            numberOfHands: size,
            hands: newHands
        });
    }   

    onHandValueChange(event){
        console.log("app", app);
        var index = event.target.getAttribute("index");

        var hands = app.state.hands;

        var val = event.target.value;

        if(val.length > 2){
            val = val.substr(0,2);
        }

        hands[index] = val;

        app.setState({
            hands: hands
        });

    }
    
    render(){
        var hand = this.state.hands;
        var Hands = hand.map((hand, index) => 
            <Player key={index}
                        index={index} 
                        value={hand} 
                        onHandValueChange={this.onHandValueChange}/>);
        return (
            <div className="container">
                <Header/>  
                <div className="row">
                    <Options numberOfHands={this.state.numberOfHands} 
                         onNumberOfHandsChange={this.onNumberOfHandsChange.bind(this)}/>
                </div>
                

                <div className="row">{Hands}</div>
                <div className="row">
                    <label>Table</label><br/>
                    <input type="text"/>
                </div>
                <br/>
                <div className="row">
                    <button className="btn btn-primary col-3" >Simular</button>
                </div>
            </div>
        );
    }
}
