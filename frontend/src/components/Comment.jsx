import React, { useState } from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';

function Comment({ comment }) {
    return (
        <>
            <Row style={{ marginTop: '10px' }}>
                <ListGroup>
                    <ListGroup.Item>
                        <Row className='align-items-center'>
                            <Col xs='auto'>
                                <Image
                                    className='rounded'
                                    src={comment?.user?.avatar}
                                    alt='profile image'
                                    fluid
                                    style={{
                                        width: '40px',
                                    }}
                                />
                            </Col>
                            <Col>
                                <h6>{comment?.user?.name}</h6>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>{comment?.text}</ListGroup.Item>
                </ListGroup>
            </Row>
        </>
    );
}

export default Comment;
