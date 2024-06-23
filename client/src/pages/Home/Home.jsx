import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "../../component/Card/Card";
import { useGetNotesQuery } from "../../redux/api/notesApi";
import { getNotes, noNotes } from "../../redux/reducer/notesReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useGetNotesQuery();
  useEffect(() => {
    if (data) {
      dispatch(getNotes(data?.userNotes));
    }else{
      dispatch(noNotes());
    }
  }, [data, dispatch]);
  return (
    <div className="container homeContainer">
      <div className="cards">
        <Card />
      </div>
    </div>
  );
};

export default Home;
