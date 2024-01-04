import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdLogin, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const MenuList = () => {
  const { user } = useContext(AuthContext);
  const auth = getAuth(app);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃이 되었습니다.");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          Profile
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/user/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button type="button" onClick={handleSignout}>
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
