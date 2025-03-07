import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {

    const Logout = () => {

    };
    
    return (
        <>
             <Navbar bg="dark" data-bs-theme="dark">
               <Container>
                 <Navbar.Brand>
                  <Link className='nav-link' to={"/"}>Lap Store</Link>
                </Navbar.Brand>

                 <Nav className="me-auto">
                    
                    <Link className='nav-link' to={"/login"}>Login</Link>
                    <Link className='nav-link' to={"/register"}>Registration</Link>
                    <Link className='nav-link' to={"/products"}>produc</Link>
                    <Link className='nav-link' to={"/Manage-products"}>Manage products</Link>
                 </Nav>

                <Nav className='ms-auto'>
                    <Nav.Link onClick={Logout}>Log out</Nav.Link>
                </Nav>
               </Container>
             </Navbar>
        </>
        )
};

export default Header;




// function ColorSchemesExample() {
//   return (
//    
//   );
// }

// export default ColorSchemesExample;