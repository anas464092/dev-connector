import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
    Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAllProfilesMutation } from '../slices/profileApiSlice';
import { toast } from 'react-toastify';

function Developers() {
    const [search, setSearch] = useState('');
    const [allProfiles, { isLoading }] = useAllProfilesMutation();
    const navigate = useNavigate();

    const showProfile = (_id) => {
        navigate('/profile', { state: { _id } });
    };
    const [allUsers, setallUsers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await allProfiles().unwrap();
                setallUsers(res.data);
            } catch (err) {
                toast.error(err?.data?.message || 'Cant fetch developers');
                console.log(err);
            }
        };
        fetchData();
    }, [allUsers]); 

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
                    <Link className='btn btn-light my-3' to='/'>
                        Go Back
                    </Link>
                    <Row>
                        <Form.Control
                            style={{ fontSize: '20px', margin: '20px 0px' }}
                            type='text'
                            placeholder='Search by Name'
                            className=' mr-sm-2'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Row>
                    {allUsers?.allProfiles?.length > 0 ? (
                        allUsers.allProfiles
                            .filter((item) => {
                                return search.toLocaleLowerCase() === ''
                                    ? item
                                    : item.user.name
                                          .toLocaleLowerCase()
                                          .includes(search);
                            })
                            .map((user) => (
                                <>
                                    <Row
                                        key={user._id}
                                        className='rounded'
                                        style={{
                                            background: '#747474',
                                            padding: '20px 10px',
                                            marginTop: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            showProfile(user.user._id)
                                        }
                                    >
                                        <Col md={3}>
                                            <Image
                                                className='rounded'
                                                src={user.user.avatar}
                                                fluid
                                            />
                                        </Col>
                                        <Col md={5}>
                                            <ListGroup>
                                                <ListGroup.Item>
                                                    <h3>{user.user.name}</h3>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <strong>
                                                        {user.status}
                                                    </strong>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    {user.bio}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <ListGroup>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <strong>
                                                                Skills
                                                            </strong>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <span>
                                                                {user.skills.join()}
                                                            </span>
                                                        </Row>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </Col>
                                    </Row>
                                </>
                            ))
                    ) : (
                        <p>No profiles found.</p>
                    )}
                </>
            )}
        </>
    );
}

export default Developers;
