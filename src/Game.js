import React, { Component } from 'react'
import './Game.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'

export default class Game extends Component {
    componentDidMount() {
        this.setupSocket()
    }

    setupSocket = () => {
        const url = "http://localhost:3000"
        // const url = "http://10.185.6.229:3000/"
        const socket = require('socket.io-client')(url);
        // socket.on('resourceGained', ({resourceType, amount, origin, totalResources}) => {
        // this.props.addResources(resourceType, amount, origin, new Date().getTime(), totalResources)
        // });
        // socket.on('buildingBuilt', ({buildings, resources}) => {
        // this.props.buildBuilding(buildings, resources)
        // });
        socket.on('initialLoadData', this.setStateFromSocket);
        socket.on('gameUpdate', this.setStateFromSocket);
        this.socket = socket
    }

    setStateFromSocket = (data) => {
        this.setState(data)
    }

    onKeyDown = (event) => {
        const snakeState = {...this.state.snake}
        switch (event.key) {
            case "ArrowUp":
                this.socket.emit("changeFacing", {x: 0, y: -1})
                break;
            case "ArrowDown":
                this.socket.emit("changeFacing", {x: 0, y: 1})
                break;
            case "ArrowLeft":
                this.socket.emit("changeFacing", {x: -1, y: 0})
                break;
            case "ArrowRight":
                this.socket.emit("changeFacing", {x: 1, y: 0})
                break;
            default:

        }
        this.setState({snake: snakeState})
    }

    render() {
        if (this.state && this.state.snake && this.state.currentWord) {
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <Board snakeHistory={this.state.snake.history}
                               snakeFacing={this.state.snake.facing}
                               currentWord={this.state.currentWord}
                               lettersCollected={this.state.lettersCollected}
                               className="board" />
                        <div className = 'column'>
                            <CurrentWord currentWord={this.state.currentWord} lettersCollected={this.state.lettersCollected} />
                            <CompletedWords words={this.state.wordsCompleted} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return "I dunno what's happening"
        }
    }
}
