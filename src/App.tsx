import React, { FunctionComponent } from 'react';
import { useEffect, useState } from "react";
import { Container, Header, PostContainer, Title } from 'styles';

type Post = {
  title: string;
  body: string;
  userId: number;
};

type ResponsePayload = Post[]

const App : FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json()
      })
      .then((data: ResponsePayload) => {
        setPosts(data);
      })
  }, [setPosts]);

  return (
    <Container>
      <Header>My Awesome blog</Header>
      {posts && posts.slice(0, 5).map((post) => (
        <PostContainer key={post.title} data-testid="post">
          <Title>{post.title}</Title>
          <span>{post.body}</span>
        </PostContainer>
      ))}
    </Container>
  );
}

export default App;
