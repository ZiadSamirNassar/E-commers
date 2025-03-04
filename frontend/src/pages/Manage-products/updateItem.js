import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/login.css';
import Alert from 'react-bootstrap/Alert';

const UpdateItem = () => {
    return(
        <div className="loginform">

            <h1 className="mb-3">Update Item Form</h1>

            <Alert variant="danger" className="p-2">
                Error Masage
            </Alert>
            <Alert variant="success" className="p-2">
                Item Created Sucssefully
            </Alert>
            
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Titel" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="text" placeholder="Price" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Quantaty" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="file" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn btn-dark w-100">
                    Update Item
                </Button>
            </Form>

        </div>
    );
}

export default UpdateItem;