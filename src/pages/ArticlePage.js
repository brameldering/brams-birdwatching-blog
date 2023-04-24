import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "./Components/CommentsList";
import AddCommentForm from "./Components/AddCommentForm";
import useUser from "../hooks/useUser";
import articles from "./article-content";

// let callCountPage = 0;
// let callCountUseEffect = 1;

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleName } = useParams();

  const { user, isLoading } = useUser();

  //   callCountPage++;
  //   console.log("==== after init ArticlePage  ==== " + callCountPage);
  //   console.log("articleInfo: ");
  //   console.log(articleInfo);
  //   console.log("articleId: " + articleName);
  //   console.log("user: ");
  //   console.log(user);
  //   console.log("isLoading " + isLoading);
  //   console.log("");

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      // Test ======================
      //   console.log("==== user.getIdToken ====");
      //   console.log("token: ");
      //   console.log(token);
      //   console.log("user: ");
      //   console.log(user);
      //   console.log("");
      // ===========================

      // if token has a value then set headers to contain token otherwise set headers to empty object
      // (otherwise headers will be a null string)
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleName}`, {
        headers,
      });
      // Test ======================
      //   console.log("==== after get article ====");
      //   console.log("headers: ");
      //   console.log(headers);
      //   console.log("response: ");
      //   console.log(response);
      //   console.log("");
      // ===========================

      const newArticleInfo = response.data;
      // Test ======================
      //   console.log("==== newArticleInfo ====");
      //   console.log("newArticleInfo: ");
      //   console.log(newArticleInfo);
      //   console.log("");
      // ===========================

      setArticleInfo(newArticleInfo);
    };
    if (!isLoading) {
      loadArticleInfo();
    }
    //callCountUseEffect++;
  }, [isLoading, articleName, user]);

  const article = articles.find((article) => article.name === articleName);
  //   console.log("==== after find article ====");
  //   console.log("article: ");
  //   console.log(article);
  //   console.log("");
  // ===========================

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    // Test ======================
    // console.log("==== addUpvote ====");
    // console.log("token: ");
    // console.log(token);
    // console.log("headers: ");
    // console.log(headers);
    // console.log("");
    // ===========================

    const response = await axios.put(`/api/articles/${articleName}/upvote`, null, { headers });
    const updatedArticle = response.data;
    // Test ======================
    // console.log("==== after put ====");
    // console.log("response: ");
    // console.log(response);
    // console.log("updatedArticle: ");
    // console.log(updatedArticle);
    // console.log("");
    // ===========================
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className='upvotes-section'>
        {user ? (
          <button onClick={addUpvote} disabled={!canUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleName}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to add a comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
