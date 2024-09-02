import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { DiCode } from 'react-icons/di';

export default function Dashboard() {
    const [addFieldName, setaddFieldName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const addField = () => {
        setShow(false);
    };

    const addBtn = (field) => {
        setaddFieldName(field);
        setShow(true);
    };

    return (
        <>
            <div style={{ color: 'black' }}>
                <Modal
                    style={{ marginTop: '120px', color: 'black' }}
                    show={show}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add {addFieldName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: 'black' }}>
                        <FloatingLabel
                            controlId='floatingTextarea2'
                            label='Institute'
                        >
                            <Form.Control
                                type='text'
                                placeholder='Organization or institute'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId='floatingTextarea2'
                            label='Status'
                        >
                            <Form.Control type='text' placeholder='Status' />
                        </FloatingLabel>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel
                                    controlId='floatingTextarea2'
                                    label='From'
                                >
                                    <Form.Control
                                        type='date'
                                        placeholder='Start date'
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel
                                    controlId='floatingTextarea2'
                                    label='To'
                                >
                                    <Form.Control
                                        type='date'
                                        placeholder='End date'
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={addField}>
                            Add {addFieldName}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <section style={{ backgroundColor: '#212121' }}>
                <MDBContainer className='py-5 '>
                    <MDBRow>
                        <MDBCol lg='4'>
                            <MDBCard className='mb-4'>
                                <MDBCardBody className='text-center'>
                                    <MDBCardImage
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU'
                                        alt='avatar'
                                        className='rounded-circle'
                                        style={{ width: '150px' }}
                                        fluid
                                    />
                                    {/* ======================== NAME ==================== */}
                                    <MDBCardText style={{ marginTop: '10px' }}>
                                        <strong>Johnatan Smith</strong>
                                    </MDBCardText>
                                    {/* =========================== STATUS =========================== */}
                                    <Form.Control
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '3px',
                                        }}
                                        type='text'
                                        value='status'
                                        placeholder='Your Status'
                                    />
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className='mb-4 mb-lg-0'>
                                <MDBCardBody className='p-0'>
                                    <MDBListGroup flush className='rounded-3'>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ============= GITHUB =================================== */}
                                            <FaGithub
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value='https://github.com'
                                                    placeholder='Your github'
                                                />
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ======================== INSTAGRAM ============================= */}
                                            <FaInstagram
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value='https://insta.com'
                                                    placeholder='Your instagram'
                                                />
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ========================= LINKEDIN =================================== */}
                                            <FaLinkedin
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value='https://linkedIn.com'
                                                    placeholder='Your linkedIn'
                                                />
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ========================= TWITTER ================================ */}
                                            <FaTwitter
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value='https://twitter.com'
                                                    placeholder='Your twitter'
                                                />
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ============================ WEBSITE =============================== */}
                                            <DiCode
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value='https://webiste.com'
                                                    placeholder='Your website'
                                                />
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg='8'>
                            <MDBCard className='mb-4'>
                                <MDBCardBody>
                                    <MDBRow>
                                        {/* ================ USERNAME ============================ */}
                                        <MDBCol sm='3'>
                                            <MDBCardText>Uername</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value='arehman'
                                                    placeholder='Username'
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* =========================== BIO =========================== */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Bio</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    as='textarea'
                                                    value='I am a student of BESE at NUST'
                                                    placeholder='Your bio'
                                                    style={{
                                                        height: '80px',
                                                        color: 'black',
                                                    }}
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* ======================= COMPANY ====================== */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Company</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value='Google'
                                                    placeholder='Your Organization'
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* ============================= SKILLS ========================== */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Skills</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value='Skill1, Skill2, ...'
                                                    placeholder='Your skills'
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* =============================ADDRESS ============================== */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value='Bay Area, San Francisco, CA'
                                                    placeholder='Your Address'
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                            {/*=========================== Education ============================= */}
                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBCard className='mb-4 mb-md-0'>
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol>
                                                    <strong>Education</strong>
                                                </MDBCol>
                                                <MDBCol>
                                                    <Button
                                                        onClick={() =>
                                                            addBtn('Education')
                                                        }
                                                    >
                                                        Add Education
                                                    </Button>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm='6'>
                                                    <MDBCardText>
                                                        NUST
                                                    </MDBCardText>
                                                    <MDBCardText className='text-muted'>
                                                        09/07/2023
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='6'>
                                                    <MDBCardText className='text-muted'>
                                                        BE Software
                                                    </MDBCardText>
                                                    <MDBCardText className='text-muted'>
                                                        09/07/2023
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                {/*======================= Experince ================================= */}
                                <MDBCol md='6'>
                                    <MDBCard className='mb-4 mb-md-0'>
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol>
                                                    <strong>Experience</strong>
                                                </MDBCol>
                                                <MDBCol>
                                                    <Button
                                                        onClick={() =>
                                                            addBtn('Experience')
                                                        }
                                                    >
                                                        Add Experience
                                                    </Button>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm='6'>
                                                    <MDBCardText>
                                                        NUST
                                                    </MDBCardText>
                                                    <MDBCardText className='text-muted'>
                                                        09/07/2023
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='6'>
                                                    <MDBCardText className='text-muted'>
                                                        BE Software
                                                    </MDBCardText>
                                                    <MDBCardText className='text-muted'>
                                                        09/07/2023
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <Button
                        className='mt-4 p-2'
                        onClick={() => console.log('Update profile clicked')}
                    >
                        Update Profile
                    </Button>
                </MDBContainer>
            </section>
        </>
    );
}
