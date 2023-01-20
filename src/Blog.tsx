import React, {useState} from 'react'
import styled from "styled-components";
// 스타일드 컴포넌트도 뭔가 새로 깔아야 함
import { v4 as uuid } from 'uuid';

const Blog = () => {

  const contentInitialState = {title: "", content: ""}
  const [content, setContent] = useState(contentInitialState)
  const [contentList, setContentList] = useState([{
    // 따로 타입 지정 안해줬는데 알아서 타입을 찾아줌
    id: uuid(),
    // uuid 지정 차이
    title: "날씨가 좋아요",
    content: "오늘 날씨가 매우 맑아요"
  },
  {
    id: uuid(),
    title: "날씨가 안 좋아요",
    content: "오늘 미세먼지가 많아서 안 맑아요"
  },
  {
    id: uuid(),
    title: "날씨가 매우 좋아요",
    content: "오늘 날씨가 매우 맑아요 춥지도 않아요"
  }, 
])

  const addContent = () => {
    if(content.title === "" || content.content === "") {
      return alert("빈값은 등록할 수 없습니다!")
    }
    setContentList([...contentList, {...content, id:uuid()}])
    setContent(contentInitialState)
  }

  const changeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    // 타입스크립트와 자바스크립트의 이벤트 타입 지정 차이점
    setContent({
      ...content,
      [event.target.name] : event.target.value
    })
  }

  const changeTextArea = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent({
      ...content,
      [event.target.name] : event.target.value
    })
  }


  return (
    <div>
      <Layout>
      <Head>
        타입스크립트로 만드는 블로그
      </Head>
      <InputBox>
      <input placeholder="글제목(15자 이내)" maxLength={15} name="title" value={content.title} onChange={changeInput}/>
      <br/>
      <br/>
      <textarea placeholder="글내용(200자 이내)" maxLength={200} name="content" value={content.content} onChange={changeTextArea}/>
      <br/>
      <br/>
      <button onClick={addContent}>입력</button>
      </InputBox>
      {contentList.map((content) => {
        return (
          <Posts>
          <Post>
          <h4>{content.title}</h4>
          <p>{content.content}</p>
        </Post> 
        </Posts>
        )
      })}
      </Layout>
    </div>
  )
}

export default Blog

export const Layout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`

const Head = styled.div`
  background-color: black;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  line-height: 50px;
  padding-left: 15px;
`

const InputBox = styled.div`
padding : 15px;
input {
  width: 200px;
}

textarea {
  width: 200px;
  height: 100px;
}

button {
  border-radius: 15px;
  width: 50px;
  background-color: black;
  color: white;
  padding: 5px;
}
`

const Posts = styled.div`
  float: left;
`

const Post = styled.div`
padding : 15px;
margin-top: 15px;
margin-left: 15px;
border-radius: 15px;
border : 1px solid grey;
width: 200px;
height: 200px;
overflow: auto;
`