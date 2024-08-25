import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Hello');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
                <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button
                style={{ marginTop: '10px', padding: '6px 20px' }}
                variant='primary'
                type='submit'
            >
                Login
            </Button>
        </Form>
    );
}

export default Login;
