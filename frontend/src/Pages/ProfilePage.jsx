import React, { useEffect } from 'react';
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
import { Link, useLocation } from 'react-router-dom';

export default function ProfilePage() {
    const location = useLocation();
    const { _id } = location.state || {};
    useEffect(() => {
        console.log(_id);
    }, []);
    return (
        <>
            <Link className='btn btn-light my-3' to='/developers'>
                Go Back
            </Link>
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
                                    <p className='text-muted mb-1'>
                                        Full Stack Developer
                                    </p>
                                    <p className='text-muted mb-4'>
                                        Bay Area, San Francisco, CA
                                    </p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className='mb-4 mb-lg-0'>
                                <MDBCardBody className='p-0'>
                                    <MDBListGroup flush className='rounded-3'>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            <MDBIcon
                                                fas
                                                icon='globe fa-lg text-warning'
                                            />
                                            <MDBCardText>
                                                https://mdbootstrap.com
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            <MDBIcon
                                                fab
                                                icon='github fa-lg'
                                                style={{ color: '#212121' }}
                                            />
                                            <MDBCardText>
                                                mdbootstrap
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            <MDBIcon
                                                fab
                                                icon='twitter fa-lg'
                                                style={{ color: '#55acee' }}
                                            />
                                            <MDBCardText>
                                                @mdbootstrap
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            <MDBIcon
                                                fab
                                                icon='instagram fa-lg'
                                                style={{ color: '#ac2bac' }}
                                            />
                                            <MDBCardText>
                                                mdbootstrap
                                            </MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            <MDBIcon
                                                fab
                                                icon='facebook fa-lg'
                                                style={{ color: '#3b5998' }}
                                            />
                                            <MDBCardText>
                                                mdbootstrap
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
                                        <MDBCol sm='3'>
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                Johnatan Smith
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                example@example.com
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                (097) 234-5678
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                Bay Area, San Francisco, CA
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                            {/* Education  */}
                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBCard className='mb-4 mb-md-0'>
                                        <MDBCardBody>
                                            <strong>Education</strong>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm='6'>
                                                    <MDBCardText>
                                                        NUST
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='6'>
                                                    <MDBCardText className='text-muted'>
                                                        BE Software
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                {/* Experince  */}
                                <MDBCol md='6'>
                                    <MDBCard className='mb-4 mb-md-0'>
                                        <MDBCardBody>
                                            <strong>Experience</strong>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm='6'>
                                                    <MDBCardText>
                                                        Cogent Lab
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='6'>
                                                    <MDBCardText className='text-muted'>
                                                        Front-End-Developer
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
