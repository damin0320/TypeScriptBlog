import React, {useState} from 'react'
import { Content } from './interfaces'
import styled from "styled-components";

// 먼저 MyPost로 컴포넌트 나눴어야 함.

// interfaces에서 타입 정한거 가져오기
interface PostProps {
  content : Content,
  handleSave : (content : Content) => void,
  handleDelete : (id: number) => void
}
const MyPost : React.FC<PostProps> = ({content, handleSave, handleDelete}) => {
// props 설정한 값 및 함수 가져오기
// 토글값 설정
const [toggle, setToggle] = useState<boolean>(false)
const toggleMenu = () => {
    setToggle(!toggle)
}

// 임시의 content값 설정
  const [tempContent, setTempContent] = useState<Content>(content)
  const save : () => void = () => {
    handleSave(tempContent)
    setToggle(false)
  }
  return (
    <div>
      <DelBtn onClick={() => {
          const result = window.confirm("이 작성글을 지우실꺼에요?")
          // 글 지울것인지 아닐지 물어보기 기능 : 사용자 편의 증가
          if(result) {
            return handleDelete(content.id);
          }else{
            return;
          }
        }
          }>삭제</DelBtn>
          <EditBtn onClick={toggleMenu}>수정</EditBtn>
          {toggle ? (
            <EditDiv>
              <input name='content' placeholder="수정하는 제목(15자 이내)" maxLength={15} value={tempContent.title} onChange={(event) => {setTempContent({
                ...tempContent, title : event.target.value
              })}}/>
              {/* 제목 고치는 Input, value를 설정해서 미리 값을 볼 수 있게 해준다. */}
              <textarea name='content' placeholder="수정하는 내용(200자 이내)" maxLength={200} value={tempContent.content} onChange={(event) => {setTempContent({
                ...tempContent, content : event.target.value
              })}}/>
              {/* // 내용 고치는 textarea, value를 설정해서 미리 값을 볼 수 있게 해준다. */}
              <br/>
              <EditComBtn onClick={() => save()}>수정완료</EditComBtn>
            </EditDiv>
          ) : null}
    </div>
  )
}

export default MyPost

const DelBtn = styled.button`
  background-color: red;
  color: white;
  border : none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 15px;
`

const EditBtn = styled.button`
  background-color: blue;
  color: white;
  border : none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer; 
`

const EditComBtn = styled.button`
  background-color: green;
  color: white;
  border : none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  margin-top: 15px;   
`

const EditDiv = styled.div`
  input {
    width: 200px;
    margin-bottom: 15px;
  }

  textarea {
  width: 200px;
  height: 100px;
}
`