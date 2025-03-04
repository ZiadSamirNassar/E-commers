import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/login.css';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    return(
        <div className="loginform">

            <h1 className="mb-3">Log-In Form</h1>

            <Alert variant="danger" className="p-2">
                Error Masage
            </Alert>
            
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn btn-dark w-100">
                    Log in
                </Button>
            </Form>

        </div>
    );
};

export default Login;





// function BasicExample() {
//   return (
//     <>
//       {[
//         'primary',
//         'secondary',
//         'success',
//         'danger',
//         'warning',
//         'info',
//         'light',
//         'dark',
//       ].map((variant) => (
//         <Alert key={variant} variant={variant}>
//           This is a {variant} alert—check it out!
//         </Alert>
//       ))}
//     </>
//   );
// }

// export default BasicExample;