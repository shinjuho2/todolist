import React, { useState } from 'react';
import './App.css';

interface List {
  id: number;
  text: string;
  complete: boolean;
}

function App() {

  const [todolist, setTodolist] = useState<List[]>([
    {
      id: 1,
      text: "예시 1",
      complete: false,
    },
  ]);

  const [input, setinput] = useState("");

  const createlist = (e:React.ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value)
  }

  return (
    <div className="App">
      <div className='Container'>
        <h1>my todolist!</h1>
        {
          todolist.map(function (a, i) {
            return (
              <div key={i}>
                <ul className='todolist'>
                  <button>완료</button>
                  <p>{a.text}</p>
                  <div className='listBtn'>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </ul>
              </div>
            )
          })
        }
        <div className='createList'>
          <input type="text" placeholder='입력해주세요' onChange={(e) => {setinput(e.target.value)}}/>
          <button onClick={() => {
            const copy = [...todolist]
            copy.unshift()
            setTodolist(copy)
          }}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default App;
