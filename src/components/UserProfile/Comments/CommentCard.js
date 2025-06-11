import React from "react";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <p className="comment-content">"{comment.content}"</p>

      <div className="comment-meta">
        <p>
          <strong>Date:</strong> {new Date(comment.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Project:</strong> {comment.project_title || "N/A"}
        </p>
        <p>
          <strong>Parent Comment:</strong>{" "}
          {comment.parent ? `#${comment.parent}` : "None"}
        </p>
      </div>

      {/* Optional → show replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          <strong>Replies:</strong>
          <ul>
            {comment.replies.map((reply) => (
              <li key={reply.id}>{reply.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
