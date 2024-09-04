import React, { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, Row, Spinner } from 'react-bootstrap';
import { BiSolidLike } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { BiSolidDislike } from 'react-icons/bi';
import {
    useDeletePostMutation,
    useLikeAndUnlikePostMutation,
    useUserPostsMutation,
} from '../slices/postApiSlice';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import { useSelector } from 'react-redux';

function UserPosts() {
    const [allPosts, { isLoading }] = useUserPostsMutation();
    const navigate = useNavigate();
    const showPost = (id) => {
        navigate(`/post/${id}`);
    };
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await allPosts().unwrap();
                setPosts(res.data.userPosts);
            } catch (err) {
                toast.error(err?.data?.message || "Can't fetch posts");
                console.log(err);
            }
        };
        fetchData();
    }, [allPosts]);

    const { userInfo } = useSelector((state) => state.auth);

    // ================================== LIKE / UNLIKE POST =======================
    const [loadingState, setLoadingState] = useState(null);
    const [likeAndUnlike] = useLikeAndUnlikePostMutation();
    const likeHandler = async (id) => {
        setLoadingState(id);
        try {
            await likeAndUnlike(id).unwrap();
            try {
                await allPosts().unwrap();
                try {
                    const res = await allPosts().unwrap();
                    setPosts(res.data.userPosts);
                } catch (err) {
                    toast.error(err?.data?.message || "Can't fetch posts");
                    console.log(err);
                }
            } catch (err) {
                toast.error(err?.data?.message || "Can't fetch posts");
                console.log(err);
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to like or Dislike');
        }
        setLoadingState(null);
    };

    // ============================ DELETING POST ======================
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [deletePost] = useDeletePostMutation();
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await deletePost(id).unwrap();
            try {
                await allPosts().unwrap();
                try {
                    const res = await allPosts().unwrap();
                    setPosts(res.data.userPosts);
                } catch (err) {
                    toast.error(err?.data?.message || "Can't fetch posts");
                    console.log(err);
                }
            } catch (err) {
                toast.error(err?.data?.message || "Can't fetch posts");
                console.log(err);
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to delete post');
        }
        setDeleteLoading(null);
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
                    <h1 style={{ color: 'yellow' }}>My Posts</h1>
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
                                                        post?._id ? (
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
                                                                {post?.likes?.findIndex(
                                                                    (like) =>
                                                                        like?.user &&
                                                                        like?.user?.toString() ===
                                                                            userInfo?._id.toString()
                                                                ) ? (
                                                                    <BiSolidLike />
                                                                ) : (
                                                                    <BiSolidDislike />
                                                                )}
                                                            </h3>
                                                        )}
                                                    </Button>
                                                    <strong>
                                                        {post?.likes?.length}
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
                                        <ListGroup.Item>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(post?._id)
                                                }
                                                disabled={
                                                    deleteLoading === post?._id
                                                }
                                            >
                                                {deleteLoading === post?._id ? (
                                                    <Spinner
                                                        animation='border'
                                                        role='status'
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                ) : (
                                                    <>Delete Post</>
                                                )}
                                            </Button>
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

export default UserPosts;
