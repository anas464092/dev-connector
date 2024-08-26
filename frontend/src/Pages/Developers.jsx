import React from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Developers() {
    const navigate = useNavigate();
    const showProfile = () => {
        navigate('/profile');
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row
                className='rounded'
                style={{
                    background: '#747474',
                    padding: '20px 10px',
                    marginTop: '20px',
                    cursor: 'pointer',
                }}
                onClick={showProfile}
            >
                <Col md={3}>
                    <Image
                        className='rounded'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU'
                        alt='profile image'
                        fluid
                    />
                </Col>
                <Col md={5}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Anas Rehman</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>Student</ListGroup.Item>
                        <ListGroup.Item>
                            Currently student of the nust doing software
                            enginnering want to become aa profficient web
                            developer aand crack gsoc.
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <strong>Skills</strong>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <span>
                                        HTML, CSS, Javascript, Java, C++, MERN,
                                        React.js, Node.js, MongoDB
                                    </span>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Developers;
