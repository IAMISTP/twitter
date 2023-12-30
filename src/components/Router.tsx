import HomePage from "pages/home";
import Notifications from "pages/notifications";
import PostsList from "pages/posts";
import PostsDetail from "pages/posts/detail";
import PostsEdit from "pages/posts/edit";
import PostsNew from "pages/posts/new";
import Profile from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import Search from "pages/search";
import Login from "pages/users/login";
import Signup from "pages/users/signup";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostsDetail />} />
      <Route path="/posts/new" element={<PostsNew />} />
      <Route path="/posts/edit/:id" element={<PostsEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/search" element={<Search />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/users/signup" element={<Signup />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
