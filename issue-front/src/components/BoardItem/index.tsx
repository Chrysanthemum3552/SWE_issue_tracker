import React from 'react'
import './style.css';
import type { BoardListItem } from 'types/interface';
import { Navigate, useNavigate } from 'react-router-dom';
import default_profile from 'assets/standard_profile.jpeg';
import default_image from 'assets/cau.png';
interface Props {
    boardListItem: BoardListItem
}


export default function BoardItem({ boardListItem }: Props) {

    // 랜더링

    const{issue_no, title, content}=boardListItem
    const{commentCount, viewCount}=boardListItem
    const{writeDatetime, writerName, status, recommand, type}=boardListItem

    // const navigator = useNavigate();

    // const onClickHandler = () => {
    //     navigator(issue_no);
    // }

  return (
    <div className='board-list-item'>
        <div className='board-list-item-box'>
            <div className='board-list-item-top'>
                <div className='board-list-item-profile-box'>
                    <div className='board-list-item-profile-image' style={{backgroundImage: `url(${default_profile})`}}></div>
                </div>
                <div className='board-list-item-write-box'>
                    <div className='board-list-item-name'>{writerName}</div>
                    <div className='board-list-item-write-date'>{writeDatetime}</div>
                </div>
            </div>
            <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>{title}</div>
                    <div className='board-list-item-content'>{content}</div>
            </div>
            <div className='board-list-item-bottom'>
                <div className='board-list-item-issue-type'>
                    {`이슈유형 : ${type}`}
                </div>
                <div className='board-list-item-recommand'>
                    {recommand ? `추천 해결자 : ${recommand}` : '추천 해결자 : 없음'}
                </div>
                <div className='board-list-item-counts'>
                    {`댓글 ${commentCount}   조회수 ${viewCount}`}
                </div>
                <div className='board-list-item-status'>
                    {`현재 상태 : ${status}`}
                </div>
            </div>
        </div>
        <div className='board-list-item-image-box'>
            <div className='board-list-item-image' style={{backgroundImage: `url(${default_image})`}}></div>
        </div>
    </div>
  )
}
