import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleNoteQuery,
  useUpdateNoteMutation,
} from "../../redux/api/notesApi";
import Loading from "../../component/Loading/Loading";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatedNote } from "../../redux/reducer/notesReducer";

const Update = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleNoteQuery(params.id);
  const [updateNote] = useUpdateNoteMutation();
   const dispatch = useDispatch();

  const getSingleNote = async () => {
    try {
      setNote({ title: data.title, description: data.description });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateNote({
        noteId: params.id,
        note: note,
      });
      if (response.data.success) {
         dispatch(updatedNote(response.data));
        toast.success("Note Updated");
        navigate("/");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleNote();
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <h1 className="">Edit Note</h1>
              <div className="inputs">
                <input
                  type="text"
                  name="title"
                  value={note.title}
                  onChange={handleInput}
                  className="input"
                  autoComplete="off"
                />
                <textarea
                  name="description"
                  value={note.description}
                  onChange={handleInput}
                  className="input"
                  autoComplete="off"
                ></textarea>
              </div>
              <button type="submit" className="button">
                Update Note
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Update;
