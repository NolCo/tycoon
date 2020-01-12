import React from 'react';
import './index.css';


//Sqaure를 그린다
function Square(props){
    return (
        <button className={["square", props.winner].join(" ")} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

//Board를 그린다
class Board extends React.Component {

    renderSquare(num, isWinner) {
        return (<Square value={this.props.squares[num]} 
                        winner= {isWinner? 'squre-winner' : ''}
                        onClick={() => this.props.onClick(num) } 
                />
        );
    }

    render() {
        const BOARD_SIZE = 19;
        const board_row = [];

        for(let i = 0; i < BOARD_SIZE; i++) {
            const square_list = [];
            for(let j = 0; j < BOARD_SIZE; j++) {
                const num = (BOARD_SIZE * i) + j;
                let winnerLine = [];
                if(this.props.winner !== null && this.props.winner.isDraw === false) {
                    winnerLine = this.props.winner.winnerLine;
                }
                let isWinner = false;
                for(let k = 0; k < BOARD_SIZE; k++) {
                    if(winnerLine[k] === num){
                        isWinner = true;
                    }
                }

                square_list.push(
                    this.renderSquare(num, isWinner)
                );
            }
            board_row.push(
                <div className="board-row">
                    {square_list}
                </div>
            )
        }
        return (
            <div>
                {board_row}
            </div>
        );
    }
}
export default Board;