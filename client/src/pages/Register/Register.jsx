import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApi";
import { userExists } from "../../redux/reducer/userReducer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useGetNotesQuery } from "../../redux/api/notesApi";
import { getNotes } from "../../redux/reducer/notesReducer";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
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
  const [register] = useRegisterMutation();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(user);

      dispatch(userExists(response.data.user));

      if (response.data.success) {
        toast.success("Registration Successful");

        const notesResponse = await refetch();
        if (notesResponse.data) {
          dispatch(getNotes(notesResponse.data));
        }

        navigate("/");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <h1 className="AccHeading">Create Account</h1>
            <div className="inputs">
              <input
                type="text"
                name="username"
                placeholder="Name"
                className="input"
                value={user.username}
                onChange={handleInput}
                autoComplete="off"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={user.email}
                onChange={handleInput}
                autoComplete="off"
                required
              />
              <div className="passwordFiled">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInput}
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
            <p className="loginLink">
              Already have an account?{" "}
              <Link to="/login" className="login">
                Sign in instead
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
