import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Card, Container, Spinner } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAddPostMutation } from '../slices/postApiSlice';
import { toast } from 'react-toastify';

function AddPost() {
    const [editorContent, setEditorContent] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null); // Create a reference for the file input
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [addPost, { isLoading }] = useAddPostMutation();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', editorContent);
        formData.append('postImage', image);

        try {
            await addPost(formData).unwrap();
            setEditorContent('');
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input field
            }
            toast.success('Post added');
        } catch (error) {
            toast.error(error?.data?.message || 'Error adding post');
        }
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean'],
        ],
    };

    return (
        <Container style={{ marginTop: '40px' }}>
            <Card className='shadow-sm p-4'>
                <h2 className='text-center mb-4'>Create a New Post</h2>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId='editorContent' className='mb-4'>
                        <Form.Label>Post Content</Form.Label>
                        <ReactQuill
                            value={editorContent}
                            onChange={handleEditorChange}
                            placeholder='Write your post content here...'
                            theme='snow'
                            style={{ minHeight: '200px' }}
                            modules={modules}
                        />
                    </Form.Group>

                    <Form.Group controlId='fileUpload' className='mb-4'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type='file'
                            required
                            name='file'
                            onChange={handleImageChange}
                            accept='image/*'
                            ref={fileInputRef} // Attach the ref to the input element
                        />
                    </Form.Group>

                    <div className='d-grid'>
                        <Button
                            variant='primary'
                            size='lg'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner animation='border' role='status' />
                            ) : (
                                'Publish Post'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default AddPost;
