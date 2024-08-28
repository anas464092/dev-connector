import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { validateLogin } from '../validation/loginValidator';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            values.email = values.email.trim();
            values.password = values.password.trim();
            const payload = {
                email: values.email,
                password: values.password,
            };
            try {
                const res = await axios.post('/api/users/login', payload);
                if (res.data.statusCode === 200) {
                    toast.success('User login successfully.');
                    resetForm();
                    setTimeout(() => {
                        navigate('/developers');
                    }, 1000);
                }
            } catch (err) {
                if (err.response) {
                    const statusCode = err.response.status;
                    if (statusCode === 400) {
                        toast.error('Invalid credentials.');
                    } else if (statusCode === 500) {
                        toast.error('Server Error, Try Later');
                    } else {
                        toast.error('An unexpected error occurred.');
                    }
                } else {
                    toast.error('Network Error or Backend Not Reachable.');
                }
            }
            setLoading(false);
        },
    });

    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className='mb-3 mt-4'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...formik.getFieldProps('email')}
                        type='email'
                        required
                        placeholder='Enter email'
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...formik.getFieldProps('password')}
                        type='password'
                        required
                        placeholder='Password'
                    />
                </Form.Group>
                <Button
                    style={{ marginTop: '10px', padding: '6px 20px' }}
                    variant='primary'
                    type='submit'
                    disabled={loading}
                    className='mb-5'
                >
                    {loading ? (
                        <Spinner animation='border' role='status' />
                    ) : (
                        <span>Login</span>
                    )}
                </Button>
            </Form>
        </>
    );
}

export default Login;
