# 개인 토이 프로젝트 : TypeScript를 이용한 게시판 형 블로그 만들기

<img src="/Users/daminan/Desktop/my-blog/src/asset/finish.png">

## 프로젝트 소개

<p align="justify">
리액트 심화 및 TypeScript 기본기를 바탕으로 한 게시판 형 블로그 만들기<br>
제한 및 공통 사항 : <br>
  <li> 컴포넌트는 자유로 한다.</li>
  <li> TypeScript를 사용한다.</li>
</p>

<br>

## 기술 스택

HTML / CSS / TypeScript / React / Axios/ dbJson /git / gitHub

<br>

## 구현 기능

### 기능 1 : input와 button 이용한 블로그 게시물 등록
- 두 개의 input을 한 번에 관리하여 값을 받음
- onChangeHandler 통한 입력값 포착 후 저장
- Axios 통신 통한 Post 메서드 활용
- DBJson 활용한 새로고침해도 데이터 없어지지 않게 함(영구성)

<br>

### 기능 2 : 만든 게시물 삭제
- Axios 통신 통한 Delete 메서드 활용

<br>

### 기능 3 : 만든 게시물 수정
- Axios 통신 통한 Put 메서드 활용
- 트러블 슈팅 : 수정 토글창이 한 번에 뜨는 현상
- 해결 :  MyPost component 나눠서 props 전달 & 수정 toggle 관리

<br>

## 배운 점 & 아쉬운 점


배운 점 <br>
- TypeScript를 활용하여 처음 시도해 본 개인 토이 프로젝트로 TypeScript 기본기 숙달에 적당했다고 판단
- React Props를 TypeScript에서는 어떤 식으로 전달해야하는지 배움

아쉬운 점 <br>
- 원파일로 만들고 싶었지만 컴포넌트를 나눠야만 하는 상황이 있어서 아쉬웠음
- Redux 등 상태관리를 했다면 어땠을까 생각해 봄. 하지만 프로젝트 규모가 작아서 상태관리는 필요 없다고 판단

<p align="justify">

</p>

<br>

## 라이센스

Copyright 2023. Personal Blog. all rights reserved.
