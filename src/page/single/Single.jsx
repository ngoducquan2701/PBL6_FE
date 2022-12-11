import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single() {
  return (
    <div className="single" style={{ display: 'flex'}}>
      <SinglePost />
      <Sidebar />
    </div>
  );
}
