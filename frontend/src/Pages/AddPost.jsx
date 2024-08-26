import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Row } from 'react-bootstrap';

function AddPost() {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(content);
        setContent('');
    };

    return (
        <>
            <Form
                noValidate
                onSubmit={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                <Row className='mb-3'>
                    <FloatingLabel
                        controlId='floatingTextarea2'
                        label='Content*'
                        style={{ color: 'black' }}
                    >
                        <Form.Control
                            as='textarea'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Leave a comment here'
                            style={{ height: '100px', color: 'black' }}
                        />
                    </FloatingLabel>
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
                    Add Post
                </Button>
            </Form>
        </>
    );
}

export default AddPost;
