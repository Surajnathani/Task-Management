import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteNoteMutation } from "../../redux/api/notesApi";
import { deletedNote, noNotes } from "../../redux/reducer/notesReducer";
import Loading from "../Loading/Loading";
import "./card.css";
import { useEffect } from "react";

const Card = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { notes, loading } = useSelector((state) => state.notes);

  const [deleteNote] = useDeleteNoteMutation();

  const deleteUserNote = async (id) => {
    try {
      const response = await deleteNote(id).unwrap();
      if (response.success) {
        dispatch(deletedNote(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(noNotes());
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : notes && notes.length && isLoggedIn ? (
        [...notes].reverse().map((curData, index) => {
          return (
            <div key={index} className="card">
              <div className="titles">
                <h3>{curData.title}</h3>
                <div className="icons">
                  <Link to={`edit/${curData._id}`}>
                    <FaRegEdit className="icon" />
                  </Link>
                  <MdOutlineDelete
                    onClick={() => deleteUserNote(curData._id)}
                    className="icon"
                  />
                </div>
              </div>
              <p style={{ whiteSpace: "pre-line" }} className="para">
                {curData.description}
              </p>
            </div>
          );
        })
      ) : (
        <>
          {!isLoggedIn ? (
            <Link to="/login" className="card">
              <div className="addCard">
                Add Note
                <IoMdAdd className="addIcon" />
              </div>
            </Link>
          ) : (
            <Link to="/addnote" className="card">
              <div className="addCard">
                Add Note
                <IoMdAdd className="addIcon" />
              </div>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Card;
