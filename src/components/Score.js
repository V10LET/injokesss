import React, { Component } from 'react'
import { injokes } from '../data/injokes'
import Button from '@material-ui/core/Button'

const styles = {
    yes: {
        animation: 'blinker 500ms linear infinite',
    }
}

export default class Score extends Component {

  state = {
      green: false
  }

  render() {
    return (
        <div>
          <Button variant="fab" className="score" style={this.flashStyle()}>{ this.calculateScore() }</Button>
        </div>
    )
  }

  flashStyle = () => {
       return this.state.green ? styles.yes : null
  }

  componentDidUpdate(prevProps) {
        if (prevProps.wordsCompleted.length < this.props.wordsCompleted.length) {
            let word = this.props.wordsCompleted[this.props.wordsCompleted.length - 1]
            if (injokes.includes(word)) {
                this.setState({green: true})
                setTimeout(()=> this.setState({green: false}), 3000)
                return new Audio(require("../images/mlg-airhorn.mp3")).play()
            }
        }
  }

  calculateScore = () => {
    let score = 0
    this.props.wordsCompleted.forEach(word => {if (injokes.includes(word)) score += word.length})
    return score
  }
}
