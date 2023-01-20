import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showState, toDoState } from "../atom";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  z-index: 1;
`;

const Question = styled(motion.div)`
  flex-direction: column;
  text-align: center;
  background-color: ${(props) => props.theme.boardColor};
  width: 350px;
  height: 200px;
  border-radius: 13px;
  font-size: 20px;
  font-weight: 800;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  button {
    border-radius: 5px;
    font-size: 15px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: 5px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.boardColor};
  }
`;

const CreatInput = styled.input`
  font-size: 15px;
  padding: 10px;
  margin-top: 30px;
  border-radius: 8px;
  border-width: 0;
  border-color: ${(props) => props.theme.bgColor};
  width: 200px;
`;

const ErrorMessage = styled.div`
  margin-top: 30px;
  color: pink;
`;

const CreateBoardVar = {
  start: { opacity: 0, scale: 0 },
  end: { opacity: 1, scale: 1, rotateZ: 360 },
  exit: { opacity: 0, scale: 0 },
  y: 100,
};

function CreateBoard() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [value, setValue] = useState("");
  const setShow = useSetRecoilState(showState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageShow, setMessageShow] = useState(false);
  useLayoutEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  });
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const boardName = e.currentTarget.boardname.value;
    if (Object.keys(toDos).length <= 5) {
      setToDos({ ...toDos, [boardName]: [] });
      setValue("");
      setShow(false);
    } else {
      setValue("");
      setMessageShow(true);
    }
  };
  const onClick = () => {
    setShow(false);
  };
  window.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Escape") {
      setShow(false);
    }
  });
  return (
    <Wrapper>
      <Question
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: 360,
          transition: { duration: 0.6 },
        }}
        exit={{ opacity: 0, scale: 0, y: -50, transition: { duration: 0.3 } }}
      >
        <Title>
          <div>보드 추가</div>
          <button onClick={onClick}>X</button>
        </Title>
        <form onSubmit={onSubmit}>
          <CreatInput
            name="boardname"
            onChange={onChange}
            placeholder="보드를 추가하세요."
            value={value}
            id={value}
            required={true}
            ref={inputRef}
          ></CreatInput>
          {messageShow && (
            <ErrorMessage>더 이상 추가할 수 없습니다.</ErrorMessage>
          )}
        </form>
      </Question>
    </Wrapper>
  );
}

export default CreateBoard;
