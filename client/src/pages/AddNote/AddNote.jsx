import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNewNoteMutation } from "../../redux/api/notesApi";
import { addedNote } from "../../redux/reducer/notesReducer";

const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [addNote] = useNewNoteMutation();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNote({
      ...note,
      user: user._id,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addNote(note).unwrap();
      if (response.success) {
        setNote({
          title: "",
          description: "",
        });
        dispatch(addedNote(response.data));
        toast.success("Note Added");
        navigate("/");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <h1 className="AccHeading">Add Note</h1>
          <div className="addInputs">
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleInput}
              placeholder="Title"
              className="input"
              autoComplete="off"
              required
            />
            <textarea
              name="description"
              value={note.description}
              onChange={handleInput}
              placeholder="Description"
              className="input"
              autoComplete="off"
              required
            ></textarea>
          </div>
          <button type="submit" className="button">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
