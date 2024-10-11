import { useEffect } from "react";
import { PostCard, Signup } from "../components";
import dbService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts as setPostsInStore } from "../app/postSlice";

const Home = () => {
  const { status: authStatus, userData } = useSelector((state) => state.auth);

  const { posts, searchTerm } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (authStatus) {
      if (!posts.length) {
        dbService
          .getPosts()
          .then((postsFromDB) => {
            if (isMounted && postsFromDB) {
              dispatch(setPostsInStore(postsFromDB.documents));
            }
          })
          .catch((error) => {
            if (isMounted) {
              console.error("Error fetching posts: ", error);
            }
          });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [authStatus, dispatch, posts]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredPosts.length && authStatus) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-2xl">Not found!</h1>
      </div>
    );
  }

  if (!filteredPosts.length && !authStatus) {
    return (
      <div className="w-full">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="/assets/Illustrations_reading-side.svg"
              className="max-w-sm"
            />
            <div>
              <h1 className="text-5xl font-bold">
                Empowering Writers, One Post at a Time
              </h1>
              <p className="py-6">
                Whether you&apos;re a seasoned blogger or just starting out, our
                platform provides the tools and community you need to succeed.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("signup").showModal()}
              >
                Join Our Community
              </button>
              <dialog id="signup" className="modal">
                <div className="modal-box">
                  <Signup />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {filteredPosts.map((post) => {
          if (post.status === "active") {
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

export default Home;
