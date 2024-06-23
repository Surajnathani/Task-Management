import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/api/userApi";
import { userNotExists } from "../../redux/reducer/userReducer";
import { noNotes } from "../../redux/reducer/notesReducer";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await logout().unwrap();
        if (response.success) {
          dispatch(userNotExists());
          dispatch(noNotes());
          // toast.success("Logout Successfully");
          navigate("/login");
        } else {
          toast.error("Logout Failed");
        }
      } catch (error) {
        toast.error("Logout Failed");
        console.error(error);
      }
    };

    handleLogout();
  }, [dispatch, logout, navigate]);

  return null;
};

export default Logout;
