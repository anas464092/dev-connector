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
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    Modal,
    Row,
    Spinner,
} from 'react-bootstrap';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DiCode } from 'react-icons/di';
import {
    useGetCurrentMutation,
    useDeleteEducationMutation,
    useAddEducationMutation,
    useDeleteExperienceMutation,
    useAddExperienceMutation,
    useUpdateProfileMutation,
} from '../slices/profileApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteAccountMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router';
import { logout } from '../slices/authSlice';

export default function Dashboard() {
    const [addFieldName, setaddFieldName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [currentProfile] = useGetCurrentMutation();
    const [currentData, setCurrentData] = useState();
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addBtn = (field) => {
        setaddFieldName(field);
        setShow(true);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await currentProfile().unwrap();
                setCurrentData(res.data);
            } catch (err) {
                setCurrentData(null);
            }
        };
        fetchProfile();
    }, [currentProfile]);

    // =================== FORM DATA ==================================
    const [status, setStatus] = useState(currentData?.status || '');
    const [username, setUsername] = useState(currentData?.handle || '');
    const [bio, setBio] = useState(currentData?.bio || '');
    const [company, setCompany] = useState(currentData?.company || '');
    const [skills, setSkills] = useState(currentData?.company || '');
    const [location, setLocation] = useState(currentData?.location || '');
    const [github, setGithub] = useState(currentData?.social?.github || '');
    const [instagram, setInstagram] = useState(
        currentData?.social?.instagram || ''
    );
    const [linkedin, setLinkedin] = useState(
        currentData?.social?.linkedin || ''
    );
    const [twitter, setTwitter] = useState(currentData?.social?.twitter || '');
    const [website, setWebsite] = useState(currentData?.social?.website || '');

    useEffect(() => {
        if (currentData) {
            setStatus(currentData.status);
            setUsername(currentData.handle);
            setBio(currentData.bio);
            setCompany(currentData.company);
            setSkills(currentData.skills.join());
            setLocation(currentData.location);
            setGithub(currentData.social.github);
            setInstagram(currentData.social.instagram);
            setLinkedin(currentData.social.linkedin);
            setTwitter(currentData.social.twitter);
            setWebsite(currentData.social.website);
        }
    }, [currentData]);
    // ===============================================================

    // ====================== ADDING EDUCATION / EXPEREINCE =================
    const [addEducation] = useAddEducationMutation();
    const [addExperience] = useAddExperienceMutation();
    const [addingFieldLoading, setAddingFieldLoading] = useState(false);
    const [addingOrganization, setAddingOrganization] = useState('');
    const [addingStatus, setAddingStatus] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const addField = async () => {
        setAddingFieldLoading(true);
        try {
            if (addFieldName === 'Education') {
                const payload = {
                    institute: addingOrganization,
                    degree: addingStatus,
                    from: fromDate,
                    to: toDate,
                };
                await addEducation(payload).unwrap();
            } else {
                const payload = {
                    company: addingOrganization,
                    title: addingStatus,
                    from: fromDate,
                    to: toDate,
                };
                await addExperience(payload).unwrap();
            }
            setAddingOrganization('');
            setAddingStatus('');
            setFromDate('');
            setToDate('');
            setShow(false);
        } catch (err) {
            toast.error(err?.data?.message);
        }
        setAddingFieldLoading(false);
        window.location.reload(true);
    };

    // ===================== DELETE EDUCATION =========================
    const [deleteEdu] = useDeleteEducationMutation();
    const [deletingEducationId, setDeletingEducationId] = useState(null);
    const deleteEducation = async (id) => {
        setDeletingEducationId(id);
        try {
            await deleteEdu(id).unwrap();
            window.location.reload(true);
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to delete');
            console.log(err);
        }
        setDeletingEducationId(null);
    };
    // =================================================================

    // ===================== DELETE EXPERIENCE =========================
    const [deleteExp] = useDeleteExperienceMutation();
    const [deletingExpId, setDeletingExpId] = useState(null);
    const deleteExperience = async (id) => {
        setDeletingExpId(id);
        try {
            await deleteExp(id).unwrap();
            window.location.reload(true);
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to delete');
            console.log(err);
        }
        setDeletingExpId(null);
    };
    // =================================================================

    // ===================== UPDATE PROFILE ===========================
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
    const [updateProfileApi] = useUpdateProfileMutation();
    const updateProfileHandler = async () => {
        setUpdateProfileLoading(true);
        try {
            const payload = {
                handle: username,
                location: location,
                status: status,
                skills: skills,
                bio: bio,
                company: company,
                github: github,
                instagram: instagram,
                linkedin: linkedin,
                twitter: twitter,
                website: website,
            };
            const res = await updateProfileApi(payload).unwrap();
            setCurrentData(res.data);
            toast.success('Profile updated');
        } catch (error) {
            if (
                error?.status === 500 &&
                error?.data?.message.includes('E11000 duplicate key error')
            ) {
                toast.error(
                    'This username is already in use. Please choose a different one.'
                );
            } else {
                toast.error(
                    error?.data?.message ||
                        'An error occurred. Please try again.'
                );
            }
        }

        setUpdateProfileLoading(false);
    };

    // ================ DELETE ACCOUNT ========================
    const [deleteAccountLoader, setDeleteAccountLoader] = useState(false);
    const [deleteAccount] = useDeleteAccountMutation();
    const deleteAccountHandler = async () => {
        setDeleteAccountLoader(true);
        try {
            await deleteAccount().unwrap();
            toast.success('Account deleted successfully.');
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            toast.error('Unable to delete Account. TRY LATER');
            console.log(err);
        }
        setDeleteAccountLoader(false);
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
                            label='Organization'
                        >
                            <Form.Control
                                type='text'
                                value={addingOrganization}
                                onChange={(e) =>
                                    setAddingOrganization(e.target.value)
                                }
                                placeholder='Organization or institute'
                            />
                        </FloatingLabel>
                        <hr />
                        <FloatingLabel
                            controlId='floatingTextarea2'
                            label='Status / Degree'
                        >
                            <Form.Control
                                value={addingStatus}
                                onChange={(e) =>
                                    setAddingStatus(e.target.value)
                                }
                                type='text'
                                placeholder='Status'
                            />
                        </FloatingLabel>
                        <hr />
                        <Row>
                            <Col md={6}>
                                <FloatingLabel
                                    controlId='floatingTextarea2'
                                    label='From'
                                >
                                    <Form.Control
                                        type='date'
                                        value={fromDate}
                                        onChange={(e) =>
                                            setFromDate(e.target.value)
                                        }
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
                                        value={toDate}
                                        onChange={(e) =>
                                            setToDate(e.target.value)
                                        }
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
                        <Button
                            variant='primary'
                            disabled={addingFieldLoading}
                            onClick={addField}
                        >
                            {addingFieldLoading ? (
                                <Spinner
                                    animation='border'
                                    role='status'
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                    }}
                                />
                            ) : (
                                <>Add {addFieldName}</>
                            )}
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
                                        src={userInfo?.avatar || ''}
                                        alt='avatar'
                                        className='rounded-circle'
                                        style={{
                                            width: '140px',
                                            height: '140px',
                                        }}
                                        fluid
                                    />
                                    {/* ======================== NAME ==================== */}
                                    <MDBCardText style={{ marginTop: '10px' }}>
                                        <strong>{userInfo?.name}</strong>
                                    </MDBCardText>
                                    {/* =========================== STATUS =========================== */}
                                    <Form.Control
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '3px',
                                        }}
                                        type='text'
                                        value={status || ''}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        placeholder='Your Status'
                                    />
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className='mb-4 mb-lg-0'>
                                <MDBCardBody className='p-0'>
                                    <MDBListGroup
                                        flush='true'
                                        className='rounded-3'
                                    >
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                                            {/* ============= GITHUB =================================== */}
                                            <FaGithub
                                                style={{ fontSize: '35px' }}
                                            />
                                            <MDBCardText>
                                                <Form.Control
                                                    type='text'
                                                    value={github || ''}
                                                    onChange={(e) =>
                                                        setGithub(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='github.com'
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
                                                    value={instagram || ''}
                                                    onChange={(e) =>
                                                        setInstagram(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='instagram.com'
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
                                                    value={linkedin || ''}
                                                    onChange={(e) =>
                                                        setLinkedin(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='linkedIn.com'
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
                                                    value={twitter || ''}
                                                    onChange={(e) =>
                                                        setTwitter(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='twitter.com'
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
                                                    value={website || ''}
                                                    onChange={(e) =>
                                                        setWebsite(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='website.com'
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
                                    {/* ================ USERNAME ============================ */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Uername</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value={username || ''}
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
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
                                                    value={bio || ''}
                                                    onChange={(e) =>
                                                        setBio(e.target.value)
                                                    }
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
                                                    value={company || ''}
                                                    onChange={(e) =>
                                                        setCompany(
                                                            e.target.value
                                                        )
                                                    }
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
                                                    value={skills || ''}
                                                    onChange={(e) =>
                                                        setSkills(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='Skill1, Skill2, ...'
                                                />
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* =============================ADDRESS ============================== */}
                                    <MDBRow>
                                        <MDBCol sm='3'>
                                            <MDBCardText>Location</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm='9'>
                                            <MDBCardText className='text-muted'>
                                                <Form.Control
                                                    type='text'
                                                    value={location || ''}
                                                    onChange={(e) =>
                                                        setLocation(
                                                            e.target.value
                                                        )
                                                    }
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
                                            {currentData?.education?.map(
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
                                                                    {edu.degree}
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
                                                            <Button
                                                                id={edu._id}
                                                                variant='secondary'
                                                                style={{
                                                                    marginTop:
                                                                        '10px',
                                                                    width: '40px',
                                                                    marginLeft:
                                                                        '10px',
                                                                }}
                                                                disabled={
                                                                    deletingEducationId ===
                                                                    edu._id
                                                                }
                                                                onClick={() =>
                                                                    deleteEducation(
                                                                        edu._id
                                                                    )
                                                                }
                                                            >
                                                                {deletingEducationId ===
                                                                edu._id ? (
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
                                                        </MDBRow>
                                                        <hr />
                                                    </>
                                                )
                                            )}
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
                                            {currentData?.experience?.map(
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
                                                                    {exp.title}
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
                                                            <Button
                                                                id={exp._id}
                                                                variant='secondary'
                                                                style={{
                                                                    marginTop:
                                                                        '10px',
                                                                    width: '40px',
                                                                    marginLeft:
                                                                        '10px',
                                                                }}
                                                                disabled={
                                                                    deletingExpId ===
                                                                    exp._id
                                                                }
                                                                onClick={() =>
                                                                    deleteExperience(
                                                                        exp._id
                                                                    )
                                                                }
                                                            >
                                                                {deletingExpId ===
                                                                exp._id ? (
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
                    <Button
                        className='ml-2 p-2'
                        disabled={updateProfileLoading}
                        onClick={updateProfileHandler}
                    >
                        {updateProfileLoading ? (
                            <Spinner animation='border' role='status' />
                        ) : (
                            <>Update Profile</>
                        )}
                    </Button>
                    <Button
                        onClick={deleteAccountHandler}
                        className='m-2 p-2'
                        disabled={deleteAccountLoader}
                    >
                        {' '}
                        {deleteAccountLoader ? (
                            <Spinner animation='border' role='status' />
                        ) : (
                            <>Delete Account</>
                        )}
                    </Button>
                </MDBContainer>
            </section>
        </>
    );
}
