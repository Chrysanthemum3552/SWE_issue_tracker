import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { classicNameResolver } from 'typescript';
import { useCookies } from 'react-cookie';

export default function Header() {

  const navigate = useNavigate();

  //로그인 상태 판별을 위한 쿠키
  const [cookies, setCookie] = useCookies();

  const [isLogin, setLogin] = useState<boolean>(false);

  //로고 클릭시 메인화면으로
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }


  //검색 기능 함수
  const SearchButton = () => {
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [word, setSearchWord] = useState<string>('');
    const{ searchWord } = useParams();

    //검색어 변경 처리 함수
    const onSearchWordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchWord(value);
    }

    //엔터 입력시 검색 버튼을 누른 것과 동일 효과가 일어나도록
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!searchButtonRef) return;
      searchButtonRef.current?.click()
    }

    //검색버튼 클릭시 주소 변화
    const onSearchButtonClickHandler = () => {
      if(!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }

    //검색어 변경마다 실행될 함수
    useEffect(() => {
      if(searchWord) {
        setSearchWord(searchWord);
        setStatus(true);
      }
    }, [searchWord])

    //돋보기 버튼 클릭시 나타나는 것들
    if(!status)
    return <div className='icon-button' onClick={onSearchButtonClickHandler}><div className='icon search-light-icon'></div></div>;
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어 입력' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>  
        </div> 
      </div>
    );
  }

  //로그인, 마이페이지 버튼 컴포넌트
  const LoginMyPageButton = () => {

    //로그인 클릭시 인증화면으로 넘어감
    const onMyPageButtonClickHandler = () => {
      navigate(USER_PATH(''));
    }

    const OnSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    if(isLogin)
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;

    return <div className='black-button' onClick={OnSignInButtonClickHandler}>{'로그인'}</div>
  }

  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Issue-tracker'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
          <LoginMyPageButton />
        </div>
      </div>
    </div>
  )
}
