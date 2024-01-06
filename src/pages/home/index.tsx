import PostForm from "components/post/PostForm";
import PostBox from "components/post/PostBox";

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
}

const posts: PostsProps[] = [
  {
    id: "1",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "2",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "3",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "4",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "5",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "6",
    email: "test@naver.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
];

const HomePage = () => {
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
        {posts?.map((post) => (
          <PostBox post={post} key={post.uid} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
