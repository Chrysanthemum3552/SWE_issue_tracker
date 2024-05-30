import './App.css';
import BoardItem from 'components/BoardItem';
import CommentItem from 'components/CommentItem';
import type { BoardListItem as BoardListItemType } from 'types/interface';
import type { CommentListItem as ConmmentListItemType} from 'types/interface';
import { commentListMock } from 'mocks';
import InputBox from 'components/InputBox';
import { useState } from 'react';


const exampleCommentListItem: ConmmentListItemType = {
  name: 'test1',
  writeDatetime: '1시간전',
  content: '수정요청'
}
const exampleBoardListItem: BoardListItemType = {
  issue_no: 1,
  title: 'Example Title',
  content: 'This is an example content for the board list item.',
  commentCount: 5,
  viewCount: 150,
  writeDatetime: '2024-05-29 14:30:00',
  writerName: 'John Doe',
  status: 'new',
  assignee: 'admin',
  fixer: 'admin',
  type: 'front-end',
  priority: 'major',
  name: 'test1'
};

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      <InputBox label='이름' type='text' placeholder='이름을 입력하세요' value={value} error={true} setValue={setValue} message='aaaa'/>
    </>
  );
}

export default App;
