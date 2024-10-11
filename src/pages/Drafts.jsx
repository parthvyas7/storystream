import { PostCard } from "../components";
import { useSelector } from "react-redux";

const Drafts = () => {
  const { posts, searchTerm } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.userData);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-base-200">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {filteredPosts.map((post) => {
          if (post.status === "inactive") {
            return (
              <div key={post.$id}>
                <PostCard {...post} author={userData.name} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default Drafts;
