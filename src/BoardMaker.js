import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Board from './Board'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class BoardMaker extends React.Component {
    render(){
        return (
            <div className="global-container">
                <div className="global-buttons">
                    <ButtonToolbar>
                        <Button variant="primary">Home</Button>
                    </ButtonToolbar>
                </div>
                <div className="board-maker-buttons">
                    <ButtonToolbar>
                        <Button variant="outline-primary">Create a new board...</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );

    }

}
export default BoardMaker;