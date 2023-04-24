import { useState } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser.js";
import dateOptions from "../../settings/blogsettings.js";

// let callCountAddCommentForm = 0;
// let callCountAddCommentFunction = 0;

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  // Test ======================
  //   callCountAddCommentForm++;
  //   console.log("==== after init AddCommentForm ==== " + callCountAddCommentForm);
  //   console.log("name: " + name);
  //   console.log("commentText: " + commentText);
  //   console.log("user: ");
  //   console.log(user);
  //   console.log("");
  // ===========================

  const addComment = async () => {
    const postedDateTime = new Date().toLocaleString("nl-NL", dateOptions);

    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    // Test ======================
    // callCountAddCommentFunction++;
    // console.log("==== addComment init ==== " + callCountAddCommentFunction);
    // console.log("user: ");
    // console.log(user);
    // console.log("token: ");
    // console.log(token);
    // console.log("headers: ");
    // console.log(headers);
    // console.log(
    //   `=== before addComment post for article ${articleName}, postedBy: ${name} and postedDateTime: ${postedDateTime}`
    // );
    // console.log("");
    // ===========================

    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        postedDateTime: postedDateTime,
        text: commentText,
      },
      {
        headers,
      }
    );

    // Test ======================
    // console.log(
    //   `=== after addComment post for article ${articleName} and postedDateTime: ${postedDateTime}`
    // );
    // console.log("");
    // ======================
    const updatedArticle = response.data;
    // Test ======================
    // console.log("updatedArticle: ");
    // console.log(updatedArticle);
    // console.log("");
    // ======================

    onArticleUpdated(updatedArticle);

    setCommentText("");
  };

  return (
    <div id='add-comment-form'>
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <label>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows='4'
          cols='50'
        />
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
