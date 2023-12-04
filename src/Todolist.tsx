import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid'
import { styled } from 'styled-components';

interface List {
  id: string;
  text: string;
  complete: boolean;
}

const Container = styled.div`
  text-align: center;
`;

const ListContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e3e2e2;
  border-radius: 20px;
`;

const ItemList = styled.li`
  list-style-type: none;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const InputList = styled.input`
  margin-right: 10px;
`;

const ButtonList = styled.button`
  margin-left: 10px;
`;

function Todolist() {

  const [todolist, setTodolist] = useState<List[]>([]);

  const [newList, setNewList] = useState("");
  const [editList, setEditList] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('todolist');
    if (data) {
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
    if (newList !== '') {
      setTodolist([...todolist, { id: uuid(), text: newList, complete: false }]);
      setNewList("");
      localStorage.setItem('todolist', JSON.stringify([...todolist, newList]))
    }
  }

  const completeList = (id: string) => {
    setTodolist((todolist) =>
      todolist.map((todo) => (todo.id === id ? { ...todo, complete: true } : todo))
    )

    localStorage.setItem('todolist', JSON.stringify(todolist.map((todo) => (todo.id === id ? { ...todo, complete: true } : todo))))
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createList();
    }
  };

  const deleteList = (id: string) => {
    setTodolist((todolist) => todolist.filter((todo) => todo.id !== id));
    localStorage.setItem('todolist', JSON.stringify(todolist.filter((todo) => todo.id !== id)))
  }

  const edit = (id: string, text: string) => {
    setEditList({ id, text });
  }

  const editCancel = () => {
    setEditList(null);
  }

  const editSave = () => {
    if (editList) {
      const updateList = todolist.map((todo) =>
        todo.id === editList.id ? { ...todo, text: editList.text } : todo
      );
      setTodolist(updateList);
      setEditList(null);
      localStorage.setItem('todolist', JSON.stringify(updateList))
    }
  }

  return (
    <Container>
      <ListContainer>
        <h1>my todolist!</h1>
        {
          todolist.map((todo) => {
            return (
              <div>
                <ItemList key={todo.id}>
                  {
                    editList?.id === todo.id ? (
                      <>
                        <InputList
                          type="text"
                          value={editList.text}
                          onChange={(e) => setEditList({ ...editList, text: e.target.value })}
                        />
                        <ButtonList onClick={editSave}>저장</ButtonList>
                        <ButtonList onClick={editCancel}>취소</ButtonList>
                      </>
                    )
                      :
                      (
                        <>
                          <ButtonList onClick={() => completeList(todo.id)}>완료</ButtonList>
                          {todo.text}
                          <ButtonList onClick={() => edit(todo.id, todo.text)}>수정</ButtonList>
                          <ButtonList onClick={() => deleteList(todo.id)}>삭제</ButtonList>
                        </>
                      )
                  }
                </ItemList>
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
      </ListContainer>
    </Container>
  );
}

export default Todolist;
