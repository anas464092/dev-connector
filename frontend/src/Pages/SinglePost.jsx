import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import postData from '../data/posts.json';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

function SinglePost() {
    const { id: postId } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(postId);
        const postResult = postData.posts[postId - 1];
        // console.log(postResult);
        setPost(postResult);
        // console.log(post);
    }, [postId]);

    const handleAddComment = () => {
        navigate(`/post/add-comment/${postId}`);
    };

    return (
        <>
            {post && post.profile && (
                <>
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
                                src={post.image}
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
                                                src={post.profile.profileImage}
                                                alt='profile image'
                                                fluid
                                                style={{ width: '60px' }}
                                            />
                                        </Col>
                                        <Col>
                                            <h3>{post.profile.name}</h3>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col
                                            xs='auto'
                                            className='d-flex flex-row gap-1 align-items-center'
                                        >
                                            <h3>
                                                <BiSolidLike />
                                            </h3>
                                            <span>{post.likes}</span>
                                        </Col>
                                        <Col>
                                            <h3>
                                                <BiSolidDislike />
                                            </h3>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {post.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        {/* Comment Section  */}
                        <Row className='align-items-center'>
                            <Col xs='auto'>
                                <h3>Comments</h3>
                            </Col>
                            <Col>
                                <Button onClick={handleAddComment}>
                                    Add Comment
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col xs='auto'>
                                            <Image
                                                className='rounded'
                                                src={post.profile.profileImage}
                                                alt='profile image'
                                                fluid
                                                style={{ width: '40px' }}
                                            />
                                        </Col>
                                        <Col>
                                            <h6>{post.profile.name}</h6>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {post.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col xs='auto'>
                                            <Image
                                                className='rounded'
                                                src={post.profile.profileImage}
                                                alt='profile image'
                                                fluid
                                                style={{ width: '40px' }}
                                            />
                                        </Col>
                                        <Col>
                                            <h6>{post.profile.name}</h6>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {post.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Row>
                </>
            )}
        </>
    );
}

export default SinglePost;
