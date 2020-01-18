import React from 'react';
import Board from './oBoard'; 
import './index.css';



class Game extends React.Component {

    constructor(props) {
        super(props);
        //state를 세팅한다.
        //history는 Sqaure배열로 만든다.
        //stepNumber 몇 번째 순번인지
        //xIsNext는 다음번이 X인지 아닌지 판단
        const BOARD_SIZE = 19
        this.BOARD_SIZE = BOARD_SIZE;
        this.state = {
            history: [{
                squares: Array(BOARD_SIZE).fill(null),
                nowStepNumber: -1,
            }],
            stepNumber: 0,
            xIsNext: true,
            sorted: null,
            winnerLine: null,
        }
       
        this.winningLines = [
        ];
        for(let j = 0; j < BOARD_SIZE; j++){     // y 축
            for(let i = 0; i < BOARD_SIZE; i++){ // X 축
                const onePoint = j * BOARD_SIZE + i;
                if(i < BOARD_SIZE - 4) {
                    this.winningLines.push([onePoint, onePoint + 1, onePoint + 2, onePoint + 3, onePoint + 4]);
                }
                if(j < this.BOARD_SIZE - 4) {
                    this.winningLines.push([onePoint, onePoint + 1 * BOARD_SIZE, onePoint + 2 * BOARD_SIZE, onePoint + 3 * BOARD_SIZE, onePoint + 4 * BOARD_SIZE]);
                }
                if(i < this.BOARD_SIZE - 4 && j < this.BOARD_SIZE - 4) {
                    this.winningLines.push([onePoint, onePoint + 1 * BOARD_SIZE + 1, onePoint + 2 * BOARD_SIZE + 2, onePoint + 3 * BOARD_SIZE + 3, onePoint + 4 * BOARD_SIZE + 4]);
                }
                if(3 < i && j < this.BOARD_SIZE - 4) {
                    this.winningLines.push([onePoint, onePoint + (1 * BOARD_SIZE - 1), onePoint + (2 * BOARD_SIZE - 2), onePoint + (3 * BOARD_SIZE - 3), onePoint + (4 * BOARD_SIZE - 4)]);
                }
            }
        }
    }

    handleClick(i) {
        //클릭 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //history : 현재 저장되있는 필드의 배열
        //stepNumber: 히스토리의 크기
        //다음번이 X인지는 현재의 반대로 저장
        this.setState({
          history: history.concat([{
            squares: squares,
            nowStepNumber: i,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    handleButtonClick(nowStatus) {
        let newStatus;
        if(nowStatus === 'desc') {
            newStatus = 'asc';
        } else if(nowStatus === 'asc') {
            newStatus = null;
        } else {
            newStatus = 'desc';
        } 

        this.setState({
            history : this.state.history.sort(function(a, b) {
                //console.log(a);
                 if(a.nowStepNumber === -1 || b.nowStepNumber === -1){
                     return 1;
                 }
     
                 if(newStatus === 'asc') {
                     return a.nowStepNumber - b.nowStepNumber;
                 } else if(newStatus === 'desc') {
                     return b.nowStepNumber - a.nowStepNumber;
                 }
                 return 1;
             }),
            sorted: newStatus
        });
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }
    
    calculateWinner(squares){
        const lines = this.winningLines;
        let result = null;
        
        for (let i = 0; i < lines.length; i++){
            const [a, b, c, d, e] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
                result = {
                    winnerLine: [a,b,c,d,e],
                    winner:squares[a],
                    isDraw:false
                };
                break;
            }
        }

        let isEmpty = false;
        for(let i = 0; i < squares.length; i++){
            if(squares[i] == null) {
                isEmpty = true;
            }
        }

        //squares가 끝났는데 승패가 안갈렸으면 
        if(isEmpty === false && result === null){
            result = {
                isDraw: true
            }            
        }

        return result;
    }

    render() {
        //현재 히스토리, 현재 판 정보, 승자 정보 가져옴
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
    
        //history를 map으로 조회하네..
        //hisotry 클릭시 jumpTo이벤트 호출
        const moves = history.map((step, move) => {
            const BOARD_SIZE = this.BOARD_SIZE;
            const desc = move ? 
            'Go to move #(' + step.nowStepNumber % BOARD_SIZE + ',' + Math.floor((step.nowStepNumber) / BOARD_SIZE) + ')' + step.nowStepNumber :
            'Go to game start';

            const selectedChecker = (this.state.stepNumber === move) ?  'selected-history' : '';

            return(
                <li className={selectedChecker} key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            if(winner.isDraw){
                status = 'This game is draw!!'
            } else {
                status = 'Winner: ' + winner.winner;
            }
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let statusName;
        if(this.state.sorted === 'desc') {
            statusName = '내림정렬';
        } else if(this.state.sorted === 'asc') {
            statusName = '오름정렬';
        } else {
            statusName = '정렬';
        } 

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} winner={winner} BOARD_SIZE={this.BOARD_SIZE} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.handleButtonClick(this.state.sorted)}>
                        {statusName}
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
export default Game;