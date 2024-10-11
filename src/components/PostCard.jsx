import dbService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useState } from "react";

const ImageWithPlaceholder = ({ src, alt, height, width, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "opacity 0.3s" }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};
const PostCard = ({ $id, title, featuredImage, $createdAt, author }) => {
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
  return (
    <Link to={`/post/${$id}`}>
      <div className="card card-compact bg-base-100 w-full max-h-80 shadow hover:shadow-lg active:scale-95">
        <figure className="w-full">
          <ImageWithPlaceholder
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            height="180px"
            width="250px"
            className="aspect-auto"
          />
        </figure>
        <div className="card-body">
          <div className="avatar space-x-2">
            <div className="w-6 rounded">
              <img
                src="https://thispersondoesnotexist.com/"
                width="20px"
                height="20px"
              />
            </div>
            <p className="text-lg font-medium">{author}</p>
          </div>
          <h2
            className="card-title line-clamp-2 text-truncate text-pretty"
            title={title}
          >
            {title}
          </h2>
          <time className="block text-xs text-gray-500">
            {getRelativeDate(new Date($createdAt))}{" "}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
