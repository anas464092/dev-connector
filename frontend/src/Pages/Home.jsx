import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('userInfo') || null;
        if (userLoggedIn) {
            navigate('/posts');
        }
    }, []);
    return (
        <div style={{ margin: '130px 0px' }}>
            <h1 style={{ color: '#03d3fc' }}>
                Empowering Developers, Connecting the World
            </h1>
            <p>Join a global community where innovation meets collaboration.</p>
            <Stack direction='horizontal' gap={4}>
                <LinkContainer to='/login'>
                    <Button variant='primary'>Login</Button>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <Button variant='primary'>Register</Button>
                </LinkContainer>
            </Stack>
        </div>
    );
}

export default Home;
