import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      navigate("/");
      toast.success("성공적으로 회원가입이 되었습니다.");
    } catch (error: any) {}
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
    if (name === "password_confirmation") {
      setUserData((prev) => ({ ...prev, passwpassword_confirmationord: value }));
      if (value.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else if (value !== userData.password) {
        setError("비밀번호와 비밀번호확인 값이 다릅니다.");
      } else {
        setError("");
      }
    }
  };
  return (
    <form className="form form--lg" onSubmit={handleSubmit}>
      <div className="form__title">회원가입</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" onChange={handleChange} required />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" onChange={handleChange} required />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirmation">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          onChange={handleChange}
          required
        />
      </div>
      {/* 만약 에러가 있다면 */}
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/login" className="form__link">
          로그인 하기
        </Link>
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn-submit" disabled={error?.length > 0}>
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
