import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FloatingLabel, Form, Modal, Spinner } from 'react-bootstrap';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import {
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetPostMutation,
    useLikeAndUnlikePostMutation,
} from '../slices/postApiSlice';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import Comment from '../components/Comment';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

function SinglePost() {
    const { userInfo } = useSelector((state) => state.auth);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [commentContent, setCommentContent] = useState('');
    const [getPost, { isLoading }] = useGetPostMutation();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPost(id).unwrap();
                setPost(res.data);
            } catch (err) {
                toast.error(err?.data?.message || 'Somrthing went wrong');
            }
        };
        fetchPost();
    }, [id]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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
            setPost(res.data.post);
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to like or Dislike');
        }
        setLoadingState(null);
    };

    // ========================== ADDING COMMENT =========================
    const [commentloadingState, setCommentLoadingState] = useState(null);
    const [addComment] = useAddCommentMutation();
    const AddComment = async (id) => {
        const payload = {
            id,
            text: commentContent,
        };
        setCommentLoadingState(id);
        try {
            const res = await addComment(payload).unwrap();
            toast.success(res?.message || 'Commment added');
            setPost(res.data);
            setShow(false);
            setCommentContent('');
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to add Comment');
            console.log(err);
        }
        setCommentLoadingState(null);
    };

    // ======================= DELETING COMMENT =====================
    const [deleltingLoading, setDeletingComment] = useState(null);
    const [deleteComment] = useDeleteCommentMutation();
    const deleteCommentHandler = async (postId, commentId) => {
        setDeletingComment(commentId);
        const payload = {
            postId,
            commentId,
        };
        try {
            const res = await deleteComment(payload).unwrap();
            setPost(res.data);
            toast.success(res?.message);
        } catch (err) {
            toast.error(err?.data?.message);
            console.log(err);
        }
        setDeletingComment(null);
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
                                <Button
                                    variant='primary'
                                    disabled={commentloadingState}
                                    onClick={() => AddComment(post?._id)}
                                >
                                    {commentloadingState ? (
                                        <Spinner
                                            animation='border'
                                            role='status'
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                            }}
                                        />
                                    ) : (
                                        <>Add Comment</>
                                    )}
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
                                                    likeHandler(post?._id)
                                                }
                                                disabled={
                                                    loadingState === post?._id
                                                }
                                            >
                                                {loadingState === post?._id ? (
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
                                                        {post?.likes?.findIndex(
                                                            (like) =>
                                                                like.user &&
                                                                like.user.toString() ===
                                                                    userInfo?._id.toString()
                                                        ) ? (
                                                            <BiSolidLike />
                                                        ) : (
                                                            <BiSolidDislike />
                                                        )}
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
                                                post?.content
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
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                        />
                                    </ListGroup.Item>
                                    {userInfo?._id === comment?.user?._id && (
                                        <ListGroup.Item>
                                            <Button
                                                onClick={() =>
                                                    deleteCommentHandler(
                                                        post._id,
                                                        comment._id
                                                    )
                                                }
                                                disabled={
                                                    deleltingLoading ===
                                                    comment?._id
                                                }
                                            >
                                                {deleltingLoading ===
                                                comment?._id ? (
                                                    <Spinner
                                                        animation='border'
                                                        role='status'
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                ) : (
                                                    <MdDelete />
                                                )}
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}

export default SinglePost;
