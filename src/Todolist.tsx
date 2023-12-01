import React, { useEffect, useState } from 'react';
import './App.css';
import uuid from 'react-uuid'

interface List {
  id: string;
  text: string;
  complete: boolean;
}

function Todolist() {

  const [todolist, setTodolist] = useState<List[]>([
    {
      id: uuid(),
      text: "예시 1",
      complete: false,
    },
  ]);

  const [newList, setNewList] = useState("");
  const [editList, setEditList] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('todolist');
    if(data) {
      setTodolist(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }, [todolist])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  }

  const createList = () => {
    if(newList !== '') {
      setTodolist([...todolist, { id: uuid(), text: newList, complete: false }]);
      setNewList("");
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createList();
    }
  };

  const deleteList = () => {
    setTodolist((todolist) => todolist.filter((todo) => todo.id !== todo.id));
  }

  return (
    <div className="App">
      <div className='Container'>
        <h1>my todolist!</h1>
        {
          todolist.map((todo) => {
            return (
              <div>
                <li className='todolist'>
                  <button>완료</button>
                  <p>{todo.text}</p>
                  <div className='listBtn'>
                    <button>수정</button>
                    <button onClick={() => deleteList()}>삭제</button>
                  </div>
                </li>
              </div>
            )
          })
        }
        <div className='createList'>
          <input 
          placeholder='입력해주세요'
          value={newList}
          onChange={inputChange}
          onKeyDown={handleKeyPress}
          />
          <button onClick={createList}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
