import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FloatingLabel, Form, Modal, Spinner } from 'react-bootstrap';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import {
    useGetPostMutation,
    useLikeAndUnlikePostMutation,
} from '../slices/postApiSlice';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import Comment from '../components/Comment';

function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [commentContent, setCommentContent] = useState('');
    const [getPost, { isLoading }] = useGetPostMutation();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPost(id).unwrap();
                setPost(res.data);
                console.log(res.data.comments);
            } catch (err) {
                toast.error(err?.data?.message || 'Somrthing went wrong');
            }
        };
        fetchPost();
    }, [id]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const AddComment = () => {
        console.log(commentContent);
        setShow(false);
        setCommentContent('');
    };

    const handleAddCommentBtn = () => {
        setShow(true);
    };

    // ================================== LIKE / UNLIKE POST =======================
    const [loadingState, setLoadingState] = useState(null);
    const [likeAndUnlike] = useLikeAndUnlikePostMutation();
    const likeHandler = async (id) => {
        setLoadingState(id);
        try {
            const res = await likeAndUnlike(id).unwrap();
            toast.success(res?.message || 'Liked or Unliked done');
            setPost(res.data.post);
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to like or Dislike');
        }
        setLoadingState(null);
    };

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '50px 0px',
                    }}
                >
                    <Spinner
                        animation='border'
                        role='status'
                        style={{
                            width: '100px',
                            height: '100px',
                        }}
                    />
                </div>
            ) : (
                <>
                    <div style={{ color: 'black' }}>
                        <Modal
                            style={{
                                marginTop: '120px',
                                color: 'black',
                            }}
                            show={show}
                            onHide={handleClose}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Comment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FloatingLabel
                                    controlId='floatingTextarea2'
                                    label='Comment'
                                >
                                    <Form.Control
                                        as='textarea'
                                        value={commentContent}
                                        onChange={(e) =>
                                            setCommentContent(e.target.value)
                                        }
                                        placeholder='Leave a comment here'
                                        style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant='secondary'
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button variant='primary' onClick={AddComment}>
                                    Add Comment
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Row
                        className='rounded'
                        style={{
                            background: 'white',
                            padding: '20px 10px',
                            marginTop: '20px',
                            color: 'black',
                        }}
                    >
                        <Col md={6}>
                            <Image
                                className='rounded'
                                src={post?.postImage}
                                alt='post image'
                                fluid
                            />
                        </Col>
                        <Col md={6}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col xs='auto'>
                                            <Image
                                                className='rounded'
                                                src={post?.author?.avatar}
                                                alt='profile image'
                                                fluid
                                                style={{
                                                    width: '60px',
                                                }}
                                            />
                                        </Col>
                                        <Col>
                                            <h3>{post?.author?.name}</h3>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col
                                            xs='auto'
                                            className='d-flex flex-row gap-1 align-items-center'
                                        >
                                            <Button
                                                onClick={() =>
                                                    likeHandler(post._id)
                                                }
                                                disabled={
                                                    loadingState === post._id
                                                }
                                            >
                                                {loadingState === post._id ? (
                                                    <>
                                                        <Spinner
                                                            animation='border'
                                                            role='status'
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                        />
                                                    </>
                                                ) : (
                                                    <h3>
                                                        <BiSolidLike />
                                                    </h3>
                                                )}
                                            </Button>
                                            <strong>
                                                {post?.likes?.length}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                post.content
                                            ),
                                        }}
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        {/* Comment Section  */}
                        <Row className='align-items-center'>
                            <Col xs='auto'>
                                <h3>Comments</h3>
                            </Col>
                            <Col>
                                <Button onClick={handleAddCommentBtn}>
                                    Add Comment
                                </Button>
                            </Col>
                        </Row>
                        {post?.comments?.map((comment) => (
                            <>
                                <Comment key={comment._id} comment={comment} />
                            </>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}

export default SinglePost;
