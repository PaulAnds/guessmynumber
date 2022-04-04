import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid';
import './Game.css';
import List from './List';

var counter = 0;
class Game extends Component {
    constructor() {
        super()
        this.state = {
            number: "",
            message: "Try it out!",
            random: generateRandomNumber(100),
            task: '',
            items: [
                
                
            ],
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
                number: value,
                task: value
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
        if (this.state.task.trim() !== '') {
            this.setState({
                task: '',
                items: [
                    ...this.state.items,
                    {
                        id: uuidv4(),
                        task: this.state.task,
                        complete: false
                    }
                ]
            })
        }
    }
    removeTask = id => {
        const {items} = this.state;
        
        const filteredItems = items.filter(
            item => item.id !== id
        );
        
        console.log(filteredItems);

        this.setState({
            items: filteredItems,


        })

    }
    render() {
        
        return (
            <div className="Game">
                <p class="texto">Guess the number from 1 - 100</p>
                <br></br>
                <input
                    className = "input"
                    type="number"
                    value = {this.state.number}
                    onChange = {this.handleOnChange}
                />
                <button onClick={this.handleOnClick}>Check</button>
                <h2 className={(this.state.message)&& 'flickering'}>{this.state.message}</h2>
                <h2>Past tries:</h2>
                <List 
                    items ={this.state.items}
                    markAsCompleted = {this.markAsCompleted}
                    removeTask = {this.removeTask}
                />

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
    counter++;
    
    if (number === random) {
        return "Congratulations you got it right!! Tries: " + counter;
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