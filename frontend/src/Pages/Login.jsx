import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { validateLogin } from '../validation/loginValidator';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        // if (userInfo) {
        //     navigate('/dashboard');
        // }
    }, []);

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
            // ApiCall
            try {
                const res = await login(payload).unwrap();
                dispatch(setCredentials({ ...res }));
                if (res.statusCode === 200) {
                    toast.success(res?.data?.message || 'Login Successfully');
                }
                resetForm();
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
            setLoading(false);
        },
    });

    return (
        <>
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
