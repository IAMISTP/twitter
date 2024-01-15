import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      navigate("/");
      toast.success("성공적으로 로그인이 되었습니다.");
    } catch (error: any) {
      console.error("로그인 에러:", error);
      toast.error(error.message);
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const { name } = e.target;
    const auth = getAuth(app);
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider as GoogleAuthProvider | GithubAuthProvider)
      .then((res) => {
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setUserData((prev) => ({ ...prev, email: value }));
      const validRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!value.match(validRegex)) {
        setError("이메일 형식에 맞지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setUserData((prev) => ({ ...prev, password: value }));
      if (value.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="form form--lg" onSubmit={handleSubmit}>
      <div className="form__title">로그인</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" onChange={handleChange} required />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" onChange={handleChange} required />
      </div>

      {/* 만약 에러가 있다면 */}
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/users/signup" className="form__link">
          회원가입 하기
        </Link>
      </div>
      <div className="form__block--lg">
        <button type="submit" className="form__btn-submit" disabled={error?.length > 0}>
          로그인
        </button>
      </div>
      <div className="form__block--lg">
        <button
          type="button"
          className="form__btn--google"
          name="google"
          onClick={onClickSocialLogin}
        >
          Google 로그인
        </button>
      </div>
      <div className="form__block--lg">
        <button
          type="button"
          className="form__btn--github"
          name="github"
          onClick={onClickSocialLogin}
        >
          Github 로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
