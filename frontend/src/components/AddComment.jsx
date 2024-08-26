import React, { useEffect } from 'react';
import { useParams } from 'react-router';

function AddComment() {
    const { id: postId } = useParams();
    useEffect(() => {
        console.log(postId);
    }, [postId]);

    return <div>Hello from the add comment</div>;
}

export default AddComment;
