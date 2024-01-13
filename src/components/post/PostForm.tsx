import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  const handleFileUpload = () => {};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setContent("");
      setTags([]);
      setHashTag("");
      toast.success("게시글을 생성하였습니다.");
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
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostForm;
