import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modeState } from "../atom";

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 40px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #785144;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 40px;
  }
  span:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    left: 4px;
    bottom: 6px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  span:after {
    position: absolute;
    font-size: 20px;
    content: "🌙";
    height: 30px;
    width: 30px;
    right: 10px;
    top: 4px;
    bottom: 6px;
    background-color: transparent;
    transition: 0.4s;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &:checked {
      color: transparent;
    }
  }

  input:checked + span {
    background-color: ${(props) =>
      props.theme.bgColor === "#1F2A37" ? "#101827" : "black"};
  }
  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }
  input:checked + span:before {
    transform: translateX(42px);
  }
  input:checked + span:after {
    position: absolute;
    font-size: 20px;
    content: "☀️";
    height: 30px;
    width: 30px;
    left: 10px;
    top: 4px;
    bottom: 6px;
    background-color: transparent;
    transition: 0.4s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

function ToggleButton() {
  const [themeMode, setThemeMode] = useRecoilState(modeState);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setThemeMode(!themeMode);
  };
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);
  return (
    <Label id="switch">
      <input type="checkbox" onChange={onChange}></input>
      <span id="slider-round"></span>
    </Label>
  );
}

export default ToggleButton;
