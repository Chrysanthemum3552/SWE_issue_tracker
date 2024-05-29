import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import type { BoardListItem as BoardListItemType } from 'types/interface';

const exampleBoardListItem: BoardListItemType = {
  issue_no: 1,
  title: 'Example Title',
  content: 'This is an example content for the board list item.',
  commentCount: 5,
  viewCount: 150,
  writeDatetime: '2024-05-29 14:30:00',
  writerName: 'John Doe',
  status: 'start',
  recommand: 'admin',
  type: 'front-end'
};

function App() {
  return (
    <>
      <BoardItem boardListItem={exampleBoardListItem} />
    </>
  );
}

export default App;
