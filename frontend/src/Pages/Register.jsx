import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Hello');
    };

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className='mb-3'>
                <Form.Group as={Col} md='4' className='position-relative'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                    />
                </Form.Group>
                <Form.Group as={Col} md='4' className='position-relative'>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                    />
                </Form.Group>
                <Form.Group as={Col} md='4'>
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control type='text' placeholder='Username' />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} md='6' className='position-relative'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='City' name='city' />
                </Form.Group>
                <Form.Group as={Col} md='3' className='position-relative'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='State'
                        name='state'
                    />
                </Form.Group>
            </Row>
            <Form.Group className='position-relative mb-3'>
                <Form.Label>File</Form.Label>
                <Form.Control
                    type='file'
                    required
                    name='file'
                    accept='image/*'
                />
            </Form.Group>
            <Button style={{ marginTop: '10px' }} type='submit'>
                Register
            </Button>
        </Form>
    );
}

export default Register;
