import React, { useState } from 'react';
import './App.css';
import uuid from 'react-uuid'

interface List {
  id: string;
  text: string;
  complete: boolean;
}

function App() {

  const [todolist, setTodolist] = useState<List[]>([
    {
      id: uuid(),
      text: "예시 1",
      complete: false,
    },
  ]);

  const [newList, setNewList] = useState("");

  const [input, setinput] = useState("");

  const createList = () => {
    if(newList !== '') {
      setTodolist([...todolist, { id: uuid(), text: newList, complete: false }]);
      setNewList('');
    }
  }

  // const createlist = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   setinput(e.target.value)
  // }

  return (
    <div className="App">
      <div className='Container'>
        <h1>my todolist!</h1>
        {
          todolist.map(function (a, i) {
            return (
              <div key={i}>
                <li className='todolist'>
                  <button>완료</button>
                  <p>{a.text}</p>
                  <div className='listBtn'>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </li>
              </div>
            )
          })
        }
        <div className='createList'>
          <input type="text" placeholder='입력해주세요' />
          <button onClick={createList}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default App;
