import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import postData from '../data/posts.json';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const navigate = useNavigate();
    const showPost = (postId) => {
        console.log(postId);
        navigate(`/post/${postId}`);
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {postData.posts.map((post) => (
                <Row
                    key={post.id}
                    className='rounded'
                    style={{
                        background: 'white',
                        padding: '20px 10px',
                        marginTop: '20px',
                        cursor: 'pointer',
                    }}
                    onClick={() => showPost(post.id)}
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
                            <ListGroup.Item>{post.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            ))}
        </>
    );
}

export default Posts;
