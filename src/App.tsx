import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  editShowState,
  edittagetState,
  modeState,
  showState,
  toDoState,
} from "./atom";
import Board from "./Components/Board";
import CreateBoard from "./Components/CreateBoard";
import { darkTheme, lightTheme } from "./theme";
import ToggleButton from "./Components/ToggleButton";
import { AnimatePresence } from "framer-motion";
import EditBoard from "./Components/EditBoard";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const AddBoard = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 50px;
  button {
    padding: 10px;
    font-size: 25px;
    color: ${(props) => props.theme.textColor};
    border-radius: 50%;
    border-color: transparent;
    background-color: ${(props) => props.theme.boardColor};
  }
`;

interface IShow {
  show: Boolean;
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const Boards = styled.div<IShow>`
  display: grid;
  justify-content: center;
  width: auto;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  opacity: ${(props) => (props.show ? 1 : 0.4)};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [show, setShow] = useRecoilState(showState);
  const [themeMode, setThemeMode] = useRecoilState(modeState);
  const targetId = useRecoilValue(edittagetState);
  useEffect(() => {
    const localData = localStorage.getItem("todo");
    const localTheme = localStorage.getItem("theme");
    if (localData !== null) {
      setToDos(JSON.parse(localData));
    }
    if (localTheme !== null) {
      setThemeMode(JSON.parse(localTheme));
    }
  }, []);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos((oldToDos) => {
        const sourceToDos = [...oldToDos[source.droppableId]];
        const takeObj = sourceToDos[source.index];
        sourceToDos.splice(source.index, 1);
        sourceToDos.splice(destination.index, 0, takeObj);
        return {
          ...oldToDos,
          [source.droppableId]: sourceToDos,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((oldToDos) => {
        const sourceToDos = [...oldToDos[source.droppableId]];
        const destinationToDos = [...oldToDos[destination.droppableId]];
        destinationToDos.splice(
          destination.index,
          0,
          sourceToDos[source.index]
        );
        sourceToDos.splice(source.index, 1);
        return {
          ...oldToDos,
          [source.droppableId]: sourceToDos,
          [destination.droppableId]: destinationToDos,
        };
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(toDos));
  }, [toDos]);
  const editShow = useRecoilValue(editShowState);
  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    setShow(!show);
  };

  return (
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <AnimatePresence>
          {editShow && <EditBoard targetId={targetId} />}
        </AnimatePresence>
        <ToggleButton />
        <AddBoard>
          <button onClick={onClick}>✚</button>
        </AddBoard>
        <Wrapper>
          <AnimatePresence>{show && <CreateBoard />}</AnimatePresence>
          <Boards show={!show}>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
