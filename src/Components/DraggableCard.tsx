import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Form = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 6px;
  padding: 8px;
  width: 90%;
  margin-bottom: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.cardTextColor};
  .span {
    width: 70%;
  }
`;

const ModalForm = styled.div`
  display: flex;
`;

interface ICardProps {
  toDoId: number;
  index: number;
  toDoText: string;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: ICardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic) => (
        <Form
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Card>
            <span>{toDoText}</span>
            <ModalForm>
              <EditModal id={toDoId + ""} boardId={boardId} />
              <DeleteModal id={toDoId + ""} boardId={boardId} />
            </ModalForm>
          </Card>
        </Form>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
