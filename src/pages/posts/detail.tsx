import Loader from "components/loader/Loader";
import PostBox from "components/post/PostBox";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostsProps } from "pages/home";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const PostsDetail = () => {
  const parmas = useParams();
  const [post, setPost] = useState<PostsProps | null>(null);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (parmas.id) {
      const docRef = doc(db, "posts", parmas.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap.data() as PostsProps), id: docSnap.id });
    }
  }, [parmas.id]);

  useEffect(() => {
    if (parmas.id) {
      getPost();
    }
  }, [getPost, parmas.id]);

  return (
    <div className="post">
      <div className="post__header">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};

export default PostsDetail;
