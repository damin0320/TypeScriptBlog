import React, {useEffect, useState} from 'react'
import styled from "styled-components";
// 스타일드 컴포넌트도 뭔가 새로 깔아야 함
import axios from 'axios'
// axios 설치 및 import

const Blog = () => {
  interface A {
    title: string;
    content: string;
    id:number;
  }
  // type 지정

  let nextId = 0

  const contentInitialState = {title: "", content: ""}
  const [content, setContent] = useState(contentInitialState)
  const [contentList, setContentList] = useState<A[]>([])
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
          <DelBtn onClick={() => {
          const result = window.confirm("이 작성글을 지우실꺼에요?")
          // 글 지울것인지 아닐지 물어보기 기능 : 사용자 편의 증가
          if(result) {
            return deleteContent(content.id);
          }else{
            return;
          }
        }
          }>삭제</DelBtn>
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

const DelBtn = styled.button`
  background-color: red;
  color: white;
  border : none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
`