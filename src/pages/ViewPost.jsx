import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dbService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { setPosts } from "../app/postSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const ViewPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const post = posts.filter((post) => post.$id === slug)[0];
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const currentTheme = localStorage.getItem("theme") ?? "light";
  const toastTheme =
    currentTheme == "light" ||
    currentTheme == "cupcake" ||
    currentTheme == "aqua" ||
    currentTheme == "cyberpunk" ||
    currentTheme == "wireframe"
      ? "light"
      : "dark";
  const notify = () =>
    toast.success("Post deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const [loading, setLoading] = useState(false);

  const deletePost = () => {
    setLoading(true);
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        dbService.deleteFile(post.featuredImage);
        const updatedPosts = posts.filter(
          (postInStore) => postInStore.$id !== post.$id
        );
        dispatch(setPosts(updatedPosts));
        setLoading(false);
        notify();
        navigate("/");
      }
    });
  };
  const calculateReadingTime = (text, wordsPerMinute = 200) => {
    const words = text.trim().split(/\s+/).length;

    const minutes = words / wordsPerMinute;

    const readingTime = Math.ceil(minutes);

    return readingTime;
  };
  const getRelativeDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return years + (years === 1 ? " year ago" : " years ago");
    if (months > 0)
      return months + (months === 1 ? " month ago" : " months ago");
    if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
    if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
    if (minutes > 0)
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    if (seconds > 0)
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    return "Just now";
  };

  const parseContent = useMemo(() => parse(post.content), [post]);

  return post ? (
    <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
      <div className="relative overflow-hidden rounded shadow">
        <img
          src={dbService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/10 pt-32 sm:pt-48 lg:pt-64">
          <div className="p-4 sm:p-6">
            <h1 className="text-white text-3xl font-bold">{post.title}</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 my-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded overflow-hidden">
            <img
              src="https://thispersondoesnotexist.com/"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow space-y-1">
          <p className="text-xl font-normal">{userData.name}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {getRelativeDate(new Date(post.$createdAt))}
            </span>
            <span className="badge badge-ghost">
              {calculateReadingTime(post.content)} minute read
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 flex space-x-2">
          {isAuthor && (
            <>
              <Link to={`/edit-post/${post.$id}`}>
                <Button disabled={loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Button>
              </Link>
              <Button onClick={deletePost} disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="browser-css text-pretty text-lg leading-relaxed">
        {parseContent}
      </div>
    </div>
  ) : (
    navigate("/")
  );
};

export default ViewPost;
