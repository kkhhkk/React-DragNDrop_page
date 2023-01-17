import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atom";

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
  width: 300px;
  padding-top: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

const DeleteBoard = styled.button`
  margin-left: auto;
  margin-right: 5px;
  font-size: 10px;
  background-color: ${(props) => props.theme.cardColor};
  width: 25px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.cardColor};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
`;

interface IDroppableProps {
  isDraggingOver: Boolean;
  draggingFromThisWith: Boolean;
}

const Area = styled.div<IDroppableProps>`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.bgColor
      : props.draggingFromThisWith
      ? "#C09D93"
      : props.theme.boardColor};
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  padding-bottom: 10px;
  input {
    align-items: center;
    font-size: 13px;
    border: 0;
    background-color: white;
    margin-left: 10px;
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
`;

interface IForm {
  todo: string;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: todo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("todo", "");
  };
  const DelClick = (e: React.FormEvent<HTMLButtonElement>) => {
    setToDos((allBoards) => {
      const newBoards = { ...allBoards };
      delete newBoards[e.currentTarget.name];
      return { ...newBoards };
    });
  };
  return (
    <Container>
      <Wrapper>
        <DeleteBoard name={boardId} onClick={DelClick}>
          ✕
        </DeleteBoard>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("todo", { required: true })}
            placeholder={`${boardId} 추가하세요.`}
          />
          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                ref={magic.innerRef}
                {...magic.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              >
                {toDos.map((todo, index) => (
                  <DraggableCard
                    boardId={boardId}
                    key={todo.id}
                    toDoId={todo.id}
                    toDoText={todo.text}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Board;
