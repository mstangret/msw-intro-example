import React, { FunctionComponent } from 'react';
import { useEffect, useState } from "react";

type Post = {
  title: string;
  body: string;
  userId: number;
};

const App : FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <div>
      <h1>blog post</h1>
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
