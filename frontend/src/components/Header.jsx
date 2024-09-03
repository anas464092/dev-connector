import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function Header() {
    const { userInfo } = useSelector((state) => state.auth);
    const [Apilogout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await Apilogout().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };

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
                        <Nav
                            style={{ alignItems: 'center', gap: '5px' }}
                            className='ms-auto'
                        >
                            <LinkContainer to='/developers'>
                                <Nav.Link>Developers</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <>
                                    <LinkContainer to='posts'>
                                        <Nav.Link>All Posts</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/add-post'>
                                        <Nav.Link>Add Post</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown
                                        title={
                                            <Image
                                                style={{
                                                    borderRadius: '100%',
                                                    width: '50px',
                                                    height: '50px',
                                                }}
                                                src={userInfo.avatar}
                                            />
                                        }
                                        id='username'
                                    >
                                        <LinkContainer to='/dashboard'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
