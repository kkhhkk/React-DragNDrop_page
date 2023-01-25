import { motion } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { editShowState, toDoState } from "../atom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Box = styled(motion.div)`
  width: 350px;
  height: 200px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  button {
    border-radius: 9px;
    font-size: 20px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: 5px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.boardColor};
  }
`;

const EditInput = styled.input`
  margin-top: 40px;
  width: 200px;
  height: 30px;
  font-weight: 100;
  font-size: 15px;
`;

interface IEditBoardForm {
  targetId: string;
}

function EditBoard({ targetId }: IEditBoardForm) {
  const setEditShow = useSetRecoilState(editShowState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onValid = ({ boardId }: any) => {
    const newToDos = { ...toDos };
    Object.keys(newToDos).map((key) => {
      delete newToDos[key];
      if (key === targetId) {
        newToDos[boardId] = toDos[key];
      } else {
        newToDos[key] = toDos[key];
      }
    });
    setValue("boardId", "");
    setToDos(newToDos);
    setEditShow(false);
  };
  useLayoutEffect(() => {
    setFocus("boardId");
  }, [setFocus]);
  const onClick = () => {
    setEditShow(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      const key = event.key;
      if (key === "Escape") {
        setEditShow(false);
      }
    });
  }, [setEditShow]);
  const BoxVariant = {
    start: {
      scale: 0,
      y: 20,
      opacity: 0,
    },
    end: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: { scale: 0, y: -40, transition: { duration: 0.4 } },
  };
  return (
    <Wrapper>
      <Box variants={BoxVariant} initial="start" animate="end" exit="exit">
        <Title>
          <div>Board 수정</div>
          <button onClick={onClick}>X</button>
        </Title>
        <form onSubmit={handleSubmit(onValid)}>
          <EditInput
            {...register("boardId", { required: true })}
            placeholder="Board를 입력하세요."
          />
        </form>
      </Box>
    </Wrapper>
  );
}

export default EditBoard;
