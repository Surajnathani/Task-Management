import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <header className="container">
        <nav className="navbar">
          <Link to="/" className="links">
            <div className="right-side">
              <div className="image">
                <img src="./avtar.jpg" alt="" />
              </div>
              <h1>Hi, {user && isLoggedIn ? `${user.username}` : "User"}👋</h1>
            </div>
          </Link>
          <div className="left-side">
            {!isLoggedIn ? (
              <Link to="/login" className="links">
                <div className="addCard">
                  <p className="addnote">Add Note</p>
                  <IoMdAdd className="addIcon" />
                </div>
              </Link>
            ) : (
              <Link to="/addnote" className="links">
                <div className="addCard">
                  <p className="addnote">Add Note</p>
                  <IoMdAdd className="addIcon" />
                </div>
              </Link>
            )}
            {isLoggedIn ? (
              <Link to="/logout" className="links">
                Logout
              </Link>
            ) : (
              <>
                <Link to="/register" className="links">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
