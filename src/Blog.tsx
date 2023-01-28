import React, {useEffect, useState} from 'react'
import styled from "styled-components";
// 스타일드 컴포넌트도 뭔가 새로 깔아야 함
import axios from 'axios'
// axios 설치 및 import
import MyPost from './MyPost';
import {Content} from './interfaces'
// 만든 컴포넌트 import


const Blog = () => {

  let nextId = 0

  const contentInitialState = {title: "", content: ""}
  const [content, setContent] = useState(contentInitialState)
  const [contentList, setContentList] = useState<Content[]>([])
  const fetchContents = async () => {
  const {data} = await axios.get('http://localhost:3001/contentList')
  // data fetcing
  setContentList(data)
}
  useEffect(() => {
    fetchContents();
  },[])
  // 랜더링 위한 useEffect

  // 게시글 추가
  const addContent = () => {
    if(content.title === "" || content.content === "") {
      return alert("빈값은 등록할 수 없습니다!")
    }
    setContentList([...contentList, {...content, id:nextId + 1}])
    axios.post('http://localhost:3001/contentList', content)
    // post 위한 설정
    setContent(contentInitialState)
  }

  // 게시글 input, textarea 변화 감지
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

  // 게시물 삭제 => redux로 상태관리 안 하고 axios만 하면 꼭 get 해주기
  // 타입 신경쓰기(uuid 안 쓰니 number로)
  const deleteContent = async (contentId : number) => {
    axios.delete(`http://localhost:3001/contentList/${contentId}`)
    const { data } = await axios.get('http://localhost:3001/contentList')
    setContentList(data)
  }

  // 글 수정하기
  const onEditContent = async (content : Content) => {
    // 제목, 컨텐츠 같이 고칠 수 있게 하기
    axios.put(`http://localhost:3001/contentList/${content.id}`, {
      title : content.title,
      content : content.content

    })
    const { data } = await axios.get('http://localhost:3001/contentList')
    setContentList(data)
    // 새로고침 안 해도 나오게 get 처리
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
          <MyPost content={content}
            key = {content.id}
            handleDelete = {deleteContent}
            handleSave={onEditContent}/>
            {/* props로 전달할 값 정하기 */}
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
width: 350px;
height: 350px;
overflow: auto;
`

