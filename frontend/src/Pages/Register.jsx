import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { validateRegister } from '../validation/registerValidator';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/userApiSlice';

function Register() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [register] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) {
            navigate('/profile');
        }
    }, []);

    // ==========================  FORMIK VALIDATION =================================
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            avatar: '',
        },
        validate: validateRegister,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', values.name.trim());
            formData.append('email', values.email.trim());
            formData.append('password', values.password.trim());
            formData.append('avatar', values.avatar);

            try {
                const res = await register(formData).unwrap();
                dispatch(setCredentials({ ...res }));
                resetForm();
                navigate('/dashboard');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
            setLoading(false);
        },
    });

    // =========================== FORMIK PART END ==================================

    return (
        <>
            <Form onSubmit={formik.handleSubmit} className='my-4'>
                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'aqua' }}>Full Name</Form.Label>
                    <Form.Control
                        {...formik.getFieldProps('name')}
                        type='text'
                        required
                        placeholder='Enter name'
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'aqua' }}>
                        Email address
                    </Form.Label>
                    <Form.Control
                        {...formik.getFieldProps('email')}
                        type='email'
                        required
                        placeholder='Enter email'
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={{ color: 'aqua' }}>Password</Form.Label>
                    <Form.Control
                        {...formik.getFieldProps('password')}
                        type='password'
                        required
                        placeholder='Password'
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'aqua' }}>Avatar</Form.Label>
                    <Form.Control
                        type='file'
                        required
                        name='file'
                        accept='image/*'
                        ref={fileInputRef} // Attach the ref
                        onChange={(event) => {
                            formik.setFieldValue(
                                'avatar',
                                event.currentTarget.files[0]
                            );
                        }}
                    />
                </Form.Group>
                <Button
                    style={{ marginTop: '10px', padding: '6px 20px' }}
                    variant='primary'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? (
                        <Spinner animation='border' role='status' />
                    ) : (
                        <span>Register</span>
                    )}
                </Button>
            </Form>
        </>
    );
}

export default Register;
