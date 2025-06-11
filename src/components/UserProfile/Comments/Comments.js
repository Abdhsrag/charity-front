import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";
import "./Comments.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user_id = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchComments = async () => {
      if (!user_id || !accessToken) {
        setError("You must be logged in to view your comments.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments/by-user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setComments(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [user_id, accessToken]);

  return (
    <div className="comments-container">
      <h2 className="comments-title">My Comments</h2>

      {loading && <p>Loading comments...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="comments-list">
        {comments.length === 0 && !loading && !error && (
          <p>No comments found.</p>
        )}

        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
