import AuthContext from "context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostsProps } from "pages/home";
import React, { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostEditForm = () => {
  const params = useParams();
  const [post, setPost] = useState<PostsProps | null>(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostsProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  const handleFileUpload = () => {};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const docRef = doc(db, "posts", post.id);
        await updateDoc(docRef, {
          content,
        });
      }
      navigate(`/posts/${post?.id}`);
      toast.success("게시글을 수정하였습니다.");
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, []);

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        onChange={handleChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="Update" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostEditForm;
