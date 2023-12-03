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
  const [editList, setEditList] = useState<{ id: string; text: string } | null>(null);

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
    // const removeList = todolist.filter((todo) => {todo.id !== todo.id});
    // setTodolist(removeList)
    setTodolist((todolist) => todolist.filter((todo) => todo.id !== todo.id));
  }

  const edit = (id: string, text: string) => {
    setEditList({id, text});
  } 

  const editCancel = () => {
    setEditList(null);
  }

  const editSave = () => {
    if (editList) {
      const updateList = todolist.map((todo) => 
        todo.id === editList.id ? {...todo, text: editList.text} : todo
      );
      setTodolist(updateList);
      setEditList(null);
    }
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
                  {
                    editList?.id === todo.id ? (
                      <>
                        <input 
                        type="text"
                        value={editList.text}
                        onChange={(e) => setEditList({...editList, text: e.target.value})}
                        />
                        <button onClick={editSave}>저장</button>
                        <button onClick={editCancel}>취소</button>
                      </>
                    )
                    :
                    (
                      <>
                        <button>완료</button>
                        {todo.text}
                        <button onClick={() => edit(todo.id, todo.text)}>수정</button>
                        <button onClick={() => deleteList()}>삭제</button>
                      </>
                    )
                  }
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
