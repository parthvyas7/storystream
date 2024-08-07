import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../components";
import { useSelector } from "react-redux";
const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.posts);
  const post = posts.filter((post) => post.$id === slug)[0];

  return post ? (
    <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
      <Post post={post} />
    </div>
  ) : (
    navigate("/")
  );
};

export default EditPost;
