import PostForm from "components/post/PostForm";
import PostBox from "components/post/PostBox";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

export interface PostsProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
  hashTags?: string[];
}

const HomePage = () => {
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
      onSnapshot(postsQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostsProps[]);
      });
    }
  }, [user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div className="home__tab home__tab__active">For you</div>
          <div className="home__tab">Following</div>
        </div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
