import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/login.css';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
    return(
        <div className="loginform">

            <h1 className="mb-3">Registration Form</h1>

            <Alert variant="danger" className="p-2">
                Error Masage
            </Alert>
            
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="First name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="Last name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn btn-dark w-100">
                    Log in
                </Button>
            </Form>

        </div>
    );
};

export default Register;