import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBListGroup,
    MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { Link, useLocation } from 'react-router-dom';
import { useGetSingleProfileMutation } from '../slices/profileApiSlice';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { DiCode } from 'react-icons/di';

export default function ProfilePage() {
    const location = useLocation();
    const { _id } = location.state || {};
    const [userProfile, { isLoading }] = useGetSingleProfileMutation();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userProfile(_id).unwrap();
                setData(res.data);
            } catch (err) {
                toast.error(err?.data?.message || 'Unable to fetch data');
                console.log(err);
            }
        };
        fetchData();
    }, [_id]);
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
                                                src={data?.user?.avatar || ''}
                                                alt='avatar'
                                                className='rounded-circle'
                                                style={{
                                                    width: '140px',
                                                    height: '140px',
                                                }}
                                                fluid
                                            />
                                            {/* ======================== NAME ==================== */}
                                            <MDBCardText
                                                style={{ marginTop: '10px' }}
                                            >
                                                <strong>
                                                    {data?.user?.name}
                                                </strong>
                                            </MDBCardText>
                                            {/* =========================== STATUS =========================== */}
                                            <MDBCardText
                                                style={{ marginTop: '10px' }}
                                            >
                                                {data?.status}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard className='mb-4 mb-lg-0'>
                                        <MDBCardBody className='p-0'>
                                            <MDBListGroup
                                                flush
                                                className='rounded-3'
                                            >
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                                    {/* ============= GITHUB =================================== */}
                                                    <FaGithub
                                                        style={{
                                                            fontSize: '35px',
                                                        }}
                                                    />
                                                    <MDBCardText>
                                                        {data?.social?.github ||
                                                            'Github'}
                                                    </MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                                    {/* ======================== INSTAGRAM ============================= */}
                                                    <FaInstagram
                                                        style={{
                                                            fontSize: '35px',
                                                        }}
                                                    />
                                                    <MDBCardText>
                                                        <MDBCardText>
                                                            {data?.social
                                                                ?.instagram ||
                                                                'Instagram'}
                                                        </MDBCardText>
                                                    </MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                                    {/* ========================= LINKEDIN =================================== */}
                                                    <FaLinkedin
                                                        style={{
                                                            fontSize: '35px',
                                                        }}
                                                    />
                                                    <MDBCardText>
                                                        <MDBCardText>
                                                            {data?.social
                                                                ?.linkedin ||
                                                                'LinkedIn'}
                                                        </MDBCardText>
                                                    </MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                                    {/* ========================= TWITTER ================================ */}
                                                    <FaTwitter
                                                        style={{
                                                            fontSize: '35px',
                                                        }}
                                                    />
                                                    <MDBCardText>
                                                        <MDBCardText>
                                                            {data?.social
                                                                ?.twitter ||
                                                                'Twitter'}
                                                        </MDBCardText>
                                                    </MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                                    {/* ============================ WEBSITE =============================== */}
                                                    <DiCode
                                                        style={{
                                                            fontSize: '35px',
                                                        }}
                                                    />
                                                    <MDBCardText>
                                                        <MDBCardText>
                                                            {data?.social
                                                                ?.webiste ||
                                                                'Website'}
                                                        </MDBCardText>
                                                    </MDBCardText>
                                                </MDBListGroupItem>
                                            </MDBListGroup>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol lg='8'>
                                    <MDBCard className='mb-4'>
                                        <MDBCardBody>
                                            {/* ================ USERNAME ============================ */}
                                            <MDBRow>
                                                <MDBCol sm='3'>
                                                    <MDBCardText>
                                                        Uername
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='9'>
                                                    <MDBCardText className='text-muted'>
                                                        {data?.handle}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            {/* =========================== BIO =========================== */}
                                            <MDBRow>
                                                <MDBCol sm='3'>
                                                    <MDBCardText>
                                                        Bio
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='9'>
                                                    <MDBCardText className='text-muted'>
                                                        {data?.bio}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            {/* ======================= COMPANY ====================== */}
                                            <MDBRow>
                                                <MDBCol sm='3'>
                                                    <MDBCardText>
                                                        Company
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='9'>
                                                    <MDBCardText className='text-muted'>
                                                        {data?.company}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            {/* ============================= SKILLS ========================== */}
                                            <MDBRow>
                                                <MDBCol sm='3'>
                                                    <MDBCardText>
                                                        Skills
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='9'>
                                                    <MDBCardText className='text-muted'>
                                                        {data?.skills.join()}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            {/* =============================ADDRESS ============================== */}
                                            <MDBRow>
                                                <MDBCol sm='3'>
                                                    <MDBCardText>
                                                        Location
                                                    </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm='9'>
                                                    <MDBCardText className='text-muted'>
                                                        {data?.location}
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
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <strong>
                                                                Education
                                                            </strong>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <hr />
                                                    {data?.education?.map(
                                                        (edu) => (
                                                            <>
                                                                <MDBRow
                                                                    key={Date.now()}
                                                                >
                                                                    <MDBCol sm='6'>
                                                                        <MDBCardText>
                                                                            {
                                                                                edu.institute
                                                                            }
                                                                        </MDBCardText>
                                                                        <MDBCardText>
                                                                            {
                                                                                edu.degree
                                                                            }
                                                                        </MDBCardText>
                                                                    </MDBCol>
                                                                    <MDBCol sm='6'>
                                                                        <MDBCardText className='text-muted'>
                                                                            {new Date(
                                                                                edu.from
                                                                            ).toLocaleDateString()}
                                                                        </MDBCardText>
                                                                        <MDBCardText className='text-muted'>
                                                                            {new Date(
                                                                                edu.to
                                                                            ).toLocaleDateString()}
                                                                        </MDBCardText>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <hr />
                                                            </>
                                                        )
                                                    )}
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>

                                        {/* Experince  */}
                                        <MDBCol md='6'>
                                            <MDBCard className='mb-4 mb-md-0'>
                                                <MDBCardBody>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <strong>
                                                                Experience
                                                            </strong>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <hr />
                                                    {data?.experience?.map(
                                                        (exp) => (
                                                            <>
                                                                <MDBRow
                                                                    key={Date.now()}
                                                                >
                                                                    <MDBCol sm='6'>
                                                                        <MDBCardText>
                                                                            {
                                                                                exp.company
                                                                            }
                                                                        </MDBCardText>
                                                                        <MDBCardText>
                                                                            {
                                                                                exp.title
                                                                            }
                                                                        </MDBCardText>
                                                                    </MDBCol>
                                                                    <MDBCol sm='6'>
                                                                        <MDBCardText className='text-muted'>
                                                                            {new Date(
                                                                                exp.from
                                                                            ).toLocaleDateString()}
                                                                        </MDBCardText>
                                                                        <MDBCardText className='text-muted'>
                                                                            {new Date(
                                                                                exp.to
                                                                            ).toLocaleDateString()}
                                                                        </MDBCardText>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <hr />
                                                            </>
                                                        )
                                                    )}
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>
                </>
            )}
        </>
    );
}
