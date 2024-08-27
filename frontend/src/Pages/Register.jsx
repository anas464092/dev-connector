import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { validateRegister } from '../validation/registerValidator';
import { Toaster } from 'react-hot-toast';

function Register() {
    // ==========================  FORMIK VALIDATION =================================
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate: validateRegister,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, resetForm) => {
            values.name = values.name.trim();
            values.email = values.email.trim();
            values.password = values.password.trim();
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            console.log(payload);
            //  ============ API CALL ================
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
                        placeholder='Enter email'
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
                    />
                </Form.Group>
                <Button
                    style={{ marginTop: '10px', padding: '6px 20px' }}
                    variant='primary'
                    type='submit'
                >
                    Register
                </Button>
            </Form>
        </>
    );
}

export default Register;
