import React, { useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { validateRegister } from '../validation/registerValidator';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Register() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

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
                const res = await axios.post('/api/users/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (res.data.statusCode === 201) {
                    toast.success('User registered successfully.');
                    resetForm();
                    if (fileInputRef.current) {
                        fileInputRef.current.value = null; // Reset the file input
                        setTimeout(() => {
                            navigate('/login');
                        }, 1000);
                        localStorage.setItem(
                            'registerUserId',
                            JSON.stringify(res.data.data._id)
                        );
                    }
                }
            } catch (err) {
                if (err.response) {
                    const statusCode = err.response.status;
                    if (statusCode === 409) {
                        toast.error('Email already registered.');
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

    // =========================== FORMIK PART END ==================================

    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
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
