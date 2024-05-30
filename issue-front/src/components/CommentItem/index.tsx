import React from 'react';
import './style.css';
import default_profile from 'assets/standard_profile.jpeg';
import type { CommentListItem } from 'types/interface';

interface Props {
  commentListItem: CommentListItem;
}







export default function CommentListItem({ commentListItem }: Props) {
  //Component
  const {name, writeDatetime, content} = commentListItem;

  return (
    <div className='comment-list-item'>
      <div className='comment-list-item-top'>
          <div className='comment-list-item-profile-box'>
              <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${default_profile})`}}></div>
          </div>
          <div className='comment-list-item-name'>{name}</div>
          <div className='comment-list-item-divider'>{'\|'}</div>
          <div className='comment-list-item-time'>{writeDatetime}</div>
      </div>
      <div className='comment-list-item-main'>
        <div className='comment-list-item-content'>{content}</div>
      </div>
    </div>
  )
}
