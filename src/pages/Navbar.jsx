import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export const NavbarContainer = () => {
    return (
        <Navbar bg="light" expand="lg" variant="light" >
            <Container>
                <Navbar.Brand className="fs-4" >Станция техобслуживания</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto fs-5">
                        <LinkContainer to="/requests">
                            <Nav.Link>Заявки</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                            <Nav.Link>Заказы</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/clients">
                            <Nav.Link>Клиенты</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/auto">
                            <Nav.Link>Авто</Nav.Link>
                        </LinkContainer>
                        {/*<LinkContainer to="/workers">*/}
                        {/*    <Nav.Link>Работники</Nav.Link>*/}
                        {/*</LinkContainer>*/}
                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    );
};
