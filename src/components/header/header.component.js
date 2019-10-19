import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = (props) => (
    <header>
        <Container>
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand href="#">{props.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/meeting/add">Dodaj Spotkanie</NavLink>
                    </Nav>
                </Navbar.Collapse>                
            </Navbar>
        </Container>
    </header>
);

Header.propTypes = {
    title: PropTypes.string,
};

export {Header};