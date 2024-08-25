import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <header style={{ borderBottom: '1px solid #515151' }}>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                style={{
                                    borderRadius: '100%',
                                    width: '40px',
                                    height: '40px',
                                    marginRight: '10px',
                                    marginBottom: '2px',
                                }}
                                src='/logo.png'
                                alt='logo'
                            />
                            Dev Connector
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/developers'>
                                <Nav.Link>Developers</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
