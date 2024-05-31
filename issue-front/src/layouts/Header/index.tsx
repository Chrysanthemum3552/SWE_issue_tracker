import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { classicNameResolver } from 'typescript';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';

export default function Header() {

  const navigate = useNavigate();

  //로그인 유저 상태
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

  //path 상태
  const { pathname } = useLocation();

  //로그인 상태 판별을 위한 쿠키
  const [cookies, setCookie] = useCookies();

  //로그인상태
  const [isLogin, setLogin] = useState<boolean>(false);

  //인증 페이지 상태
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //메인 페이지 상태
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //검색 페이지 상태
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  //게시물 상세 페이지 상태
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //게시물 작성 페이지 상태
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //게시물 수정 페이지 상태
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  //유저 페이지 상태
  const [isUserPage, setUserPage] = useState<boolean>(false);

  


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
  const MyPageButton = () => {

    //유저 이메일 패스 변수 상태
    const { userEmail } = useParams();

    //마이페이지 클릭시 인증화면으로 넘어감
    const onMyPageButtonClickHandler = () => {
      if(!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //로그아웃 클릭시 이밴트 핸들러
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    }

    //로그인 클릭시의 이벤트 핸들러
    const OnSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    if(isLogin && userEmail === loginUser?.email)
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
    if(isLogin)
      return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;
    return <div className='black-button' onClick={OnSignInButtonClickHandler}>{'로그인'}</div>;
  }

  //업로드 버튼 랜더링

  const UploadButton = () => {

    //게시물 상태
    const { title, content, boardImageFileList, resetBoard} = useBoardStore();

    

    //업로드 버튼 클릭 처리
    const onUploadButtonClickHandler = () => {

    }

    //가능 
    if(title && content)
    return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;

    //불가능
    return <div className='disable-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;

    

  }

  // 매 path변경시 실행
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);

    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);

    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);

    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);

    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);

    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);

    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  }, [pathname])


  // header 레이아웃 랜더링
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
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage)&& <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  )
}
