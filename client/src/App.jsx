import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./component/Loading/Loading";
import Navbar from "./component/Navbar/Navbar";
import { useGetUserDetailsQuery } from "./redux/api/userApi";
import { userExists, userNotExists } from "./redux/reducer/userReducer";

const Home = lazy(() => import("./pages/Home/Home"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const AddNote = lazy(() => import("./pages/AddNote/AddNote"));
const Logout = lazy(() => import("./pages/Logout/Logout"));
const Update = lazy(() => import("./pages/Update/Update"));
const Error = lazy(() => import("./pages/Error/Error"));

const App = () => {
  const dispatch = useDispatch();

  const { data: userDetails, isLoading } = useGetUserDetailsQuery();
  
  useEffect(() => {
    if (userDetails) {
      dispatch(userExists(userDetails?.data));
    } else {
      dispatch(userNotExists());
    }
  }, [userDetails, dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
