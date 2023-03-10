import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atom";
import "bootstrap/dist/css/bootstrap.min.css";

const DelButton = styled.div`
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

interface IId {
  id: string;
  boardId: string;
}

function DeleteModal({ id, boardId }: IId) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const onClick = () => {
    setShow(false);
    const targetId = Number(id);
    const afterToDo = toDos[boardId].filter((del) => del.id !== targetId);
    setToDos({ ...toDos, [boardId]: afterToDo });
  };

  const onEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };
  document
    .getElementById("delId")
    ?.addEventListener("keydown", function (event) {
      const key = event.key;
      console.log(key);
      if (key === "Enter") {
        event?.preventDefault();
        onClick();
      }
    });
  return (
    <>
      <DelButton>
        <Button id={id} variant="warning" onClick={handleShow}>
          <span>π</span>
        </Button>
      </DelButton>
      <Modal
        style={{ color: "black" }}
        show={show}
        onHide={() => handleClose}
        onEscapeKeyDown={onEscapeKeyDown}
      >
        <Modal.Header>
          <Modal.Title>μ­μ  νμκ² μ΅λκΉ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>μ­μ λ₯Ό μνμλ©΄ 'μ­μ ' λ²νΌμ λλ₯΄μΈμ.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            μ·¨μ
          </Button>

          <Button id="delId" variant="primary" onClick={onClick}>
            μ­μ 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
