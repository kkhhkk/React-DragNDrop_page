import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditButton = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 3px;
  border-radius: 6px;
  button {
    padding: 6px;
    background-color: ${(props) => props.theme.cardColor};
    border-color: transparent;
    :hover {
      display: block;
    }
  }
  span {
    size: 10px;
    text-align: center;
  }
`;

const ModalInput = styled.input`
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
`;

interface IId {
  id: string;
  boardId: string;
}

function EditModal({ id, boardId }: IId) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  });
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setEdit("");
  };
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEdit(e.currentTarget.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  const handleClick = () => {
    setShow(false);
    const findIndex = toDos[boardId].findIndex(
      (todo) => todo.id === Number(id)
    );
    const copyToDos = [...toDos[boardId]];
    copyToDos[findIndex] = { ...copyToDos[findIndex], text: edit };
    setToDos({ ...toDos, [boardId]: copyToDos });
    setEdit("");
  };
  window.addEventListener("keydown", function (event) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
      handleClose();
    }
  });
  return (
    <>
      <EditButton>
        <Button id={id} variant="primary" onClick={handleShow}>
          <span>✏️</span>
        </Button>
      </EditButton>
      <Modal show={show} onHide={() => handleClose}>
        <Modal.Header>
          <Modal.Title>수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalInput
            ref={inputRef}
            id={id}
            placeholder="수정할 문구를 입력하세요."
            onChange={onChange}
            value={edit}
            onKeyPress={onKeyPress}
          ></ModalInput>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button id={id} variant="primary" onClick={handleClick}>
            변경
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
