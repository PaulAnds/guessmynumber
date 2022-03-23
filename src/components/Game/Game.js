import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
    constructor() {
        super()
        this.state = {
            number: "",
            message: "",
            random: generateRandomNumber(100)
        }

        
    }

    handleOnChange = e => {
        //const value = e.target.value
        const {target: {value}} = e;

        console.log(value);

        //Evito que la página se recargue presionando enter
        if(e.keyCode === 13) {
            e.preventDefault();
        }

        if(value.trim() > 0) {
            this.setState({
                number: value
            });
        }
       
        /* Message vuelve a su estado inicial para dejar
         de mostrar el mensaje en pantalla al meter un nuevo */ 
         this.setState({
            message: "",
        });
    }

    handleOnClick = () => {
        const number = parseInt(this.state.number);
        const random = parseInt(this.state.random);
        const text = calculateText(number, random);
        console.log(random);

        /* Determina que si el número es diferente de random devuelve
        number a su estado inicial 
        de otro modo cuando ganas quiero que el número 
        no vuelva a su estado inicial para que en el input se muestre el número con el que ganaste*/
        if (number !== random){
            this.setState({
                number: "",
                message: text,
            });
        } else {
            this.setState({
                message: text,
            });
        }
        
    }
    render() {
        
        return (
            <div className="Game">
                <p class="texto">Guess the number from 1 - 100</p>
                <input
                    type="number"
                    value = {this.state.number}
                    onChange = {this.handleOnChange}
                />
                <button onClick={this.handleOnClick}>Check</button>
                <h2 className={(this.state.message)&& 'flickering'}>{this.state.message}</h2>
            </div>
        );
    }
}

export default Game;

function generateRandomNumber(max, min=1) {
    return Math.floor(Math.random()*(max - min) + min);
}

function calculateText(number, random) {
    const soClose = 5;
    const diff = Math.abs(random - number);
    
    if (number === random) {
        return "Congratulations you got it right!!";
    }
    
    if (diff < soClose) {
        
        if (number < random) {
            return "You're so close!! Your number is a little bit lower."
        } else {
            return "You're so close!! Your number is a little bit higher."
        }

    } else {
        if (number < random) {
            return "Your number is way to low!"
        } else {
            return "Your number is way to high!"
        }
    }
}