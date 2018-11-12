import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import Score from '../components/Score'

const styles = {
    completed: {
        fontSize: 16,
        color: '#33ab9f',
        paddingTop: 20,
    }
}

export default class CompletedWords extends Component {
    render() {
        return (
            <Card className="completed-card">
                <div className='card-header'>
                    <div className="card-title">Completed</div>
                    <Score wordsCompleted={this.props.words}/>
                </div>

                <div>
                    {this.props.words.map(word => {
                        return <div key={word} style={styles.completed}>{word}</div>
                    })}
                </div>
            </Card>
        )
    }
}
