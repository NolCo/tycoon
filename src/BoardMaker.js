import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Board from './Board'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class BoardMaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createModalShow: false
        }
    }

    render(){
        const handleShow = () => this.setState({
            createModalShow: true
        });
        const handleClose = () => this.setState({
            createModalShow: false
        });
        
        return (
            <div className="global-container">
                <div className="global-buttons">
                    <ButtonToolbar>
                        <Button variant="primary">Home</Button>
                    </ButtonToolbar>
                </div>
                <div className="board-maker-buttons">
                    <ButtonToolbar>
                        <Button variant="outline-primary" onClick={handleShow}>Create a new board...</Button>
                    </ButtonToolbar>
                </div>
                <Modal show={this.state.createModalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }

}
export default BoardMaker;