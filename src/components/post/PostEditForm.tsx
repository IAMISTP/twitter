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
  const [hashTag, setHashTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostsProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
    }
  }, [params.id]);

  const handleFileUpload = (e: any) => {
    console.log("click");

    const {
      target: { file },
    } = e;
    console.log(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const docRef = doc(db, "posts", post.id);
        await updateDoc(docRef, {
          content,
          hashTags: tags,
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

  const onChangeHashTag = (e: ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value.trim());
  };

  const revmoveTag = (tag: string) => {
    setTags(tags.filter((value) => value !== tag));
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
      //태그생성
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
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span className="post-form__hashtags-tags" key={index} onClick={() => revmoveTag(tag)}>
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <input type="submit" value="Update" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostEditForm;
