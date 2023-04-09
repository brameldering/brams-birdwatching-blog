const CommentsList = ({ comments }) => (
  <>
    <h3>Comments:</h3>
    {comments.map((comment) => (
      <div
        className="comment"
        key={comment.postedBy + ": " + comment.postedDateTime}
      >
        <h4>
          {comment.postedBy} on {comment.postedDateTime}
        </h4>
        <p>{comment.text}</p>
      </div>
    ))}
  </>
);

export default CommentsList;
