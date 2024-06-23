import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApi";
import { userExists } from "../../redux/reducer/userReducer";
import { useGetNotesQuery } from "../../redux/api/notesApi";
import { getNotes } from "../../redux/reducer/notesReducer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { refetch } = useGetNotesQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(user).unwrap();

      if (response.success) {
        dispatch(userExists(response.user));
        toast.success("Login Successful");
        
        const notesResponse = await refetch();
        if (notesResponse.data) {
          dispatch(getNotes(notesResponse.data));
        }

        navigate("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };
  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <h1 className="AccHeading">Login Account</h1>
            <div className="inputs">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
                autoComplete="off"
                required
              />
              <div className="passwordFiled">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Password"
                  className="input password"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="eyeIcon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaRegEye
                    className="eyeIcon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="button">
              Continue
            </button>
            <p className="registerLink">
              Doesn’t have an account yet?{" "}
              <Link to="/register" className="register">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
