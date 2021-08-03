import styled from "styled-components"

export const Container = styled.div`
  padding: 16px 128px;
`

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 32px;
`

export const PostContainer = styled.div`
  background-color: pink;
  border: 2px solid pink;
  border-radius: 4px;
  color: ;
  padding: 24px;

  &+& {
    margin-top: 16px;
  }
`

export const Title = styled.h2`
margin: 0;  
margin-bottom: 8px;
padding: 0;

`