import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {
    return (
        <header>
            <Container>
                <Navbar expand="lg" variant="light" bg="light">
                    <Navbar.Brand href="#">{props.title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <NavLink className="btn" to={`${process.env.PUBLIC_URL}/`}>Lista spotkań</NavLink>
                            <NavLink className="btn btn-primary" to={`${process.env.PUBLIC_URL}/meeting/add`}>Dodaj spotkanie</NavLink>
                        </Nav>
                    </Navbar.Collapse>                
                </Navbar>
            </Container>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string,
};

export {Header};