import React, { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, Row, Spinner } from 'react-bootstrap';
import { BiSolidLike } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {
    useAllPostsMutation,
    useLikeAndUnlikePostMutation,
} from '../slices/postApiSlice';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization

function Posts() {
    const [allPosts, { isLoading }] = useAllPostsMutation();
    const navigate = useNavigate();
    const showPost = (id) => {
        navigate(`/post/${id}`);
    };
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await allPosts().unwrap();
                setPosts(res.data);
            } catch (err) {
                toast.error(err?.data?.message || "Can't fetch posts");
            }
        };
        fetchData();
    }, [allPosts]);

    // ================================== LIKE / UNLIKE POST =======================
    const [loadingState, setLoadingState] = useState(null);
    const [likeAndUnlike] = useLikeAndUnlikePostMutation();
    const likeHandler = async (id) => {
        setLoadingState(id);
        try {
            const res = await likeAndUnlike(id).unwrap();
            toast.success(res?.message || 'Liked or Unliked done');
            setPosts(res.data.allPosts);
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
                    {posts?.length === 0 ? (
                        <h1>No posts added</h1>
                    ) : (
                        posts?.map((post) => (
                            <Row
                                key={post._id}
                                className='rounded'
                                style={{
                                    background: 'white',
                                    padding: '20px 10px',
                                    marginTop: '20px',
                                }}
                            >
                                <Col md={6}>
                                    <Image
                                        className='rounded'
                                        src={post.postImage}
                                        alt='post image'
                                        fluid
                                        onClick={() => showPost(post._id)}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row className='align-items-center'>
                                                <Col xs='auto'>
                                                    <Image
                                                        className='rounded'
                                                        src={post.author.avatar}
                                                        alt='profile image'
                                                        fluid
                                                        style={{
                                                            width: '60px',
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <h3>{post.author.name}</h3>
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
                                                            likeHandler(
                                                                post._id
                                                            )
                                                        }
                                                        disabled={
                                                            loadingState ===
                                                            post._id
                                                        }
                                                    >
                                                        {loadingState ===
                                                        post._id ? (
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
                                                        {post.likes.length}
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
                            </Row>
                        ))
                    )}
                </>
            )}
        </>
    );
}

export default Posts;
