import React, { FunctionComponent } from 'react';
import { useEffect, useState } from "react";

type Post = {
  title: string;
  body: string;
  userId: number;
};

const App : FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.error 
        ? setError(data.error)
        : setPosts(data);
      })
      .catch(() => {
        setError("Generic error")
      });
  }, [setPosts, setError]);

  return (
    <div>
      <h1>blog post</h1>
      {error && <div>An error occurred: {error}</div>}
      {posts && posts.slice(0, 5).map((post) => (
        <div key={post.title} data-testid="post">
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
