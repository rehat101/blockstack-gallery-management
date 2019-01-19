import styled from 'styled-components';

const transition = 'transition: border-color 0.25s ease 0s;';

export const Input = styled.input`
  background-color: white;
  box-shadow: none;
  resize: none;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: #C6C6C6;
  border-image: initial;
  margin: 10px auto;
  ${transition}

  &:focus {
      border-color: #BD10E0;
      outline: 0px;
  }
`;

export const InputContainer = styled.div`
  padding-bottom: 5px;
`;

export const InputTitle = styled.div`
  font-size: 16px;
`;

export const InvisibleInput = styled.input`
  background-color: white;
  box-shadow: none;
  outline: none;
  resize: none;
  display: block;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0;
  overflow: hidden;
  margin: 10px auto;
  border: 0;
  color: black;
  font-size: ${props => props.fontSize};
`;

export const InvisibleTextArea = styled.textarea`
  background-color: white;
  box-shadow: none;
  resize: none;
  display: block;
  outline: none;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0;
  height: 150px;
  overflow: hidden;
  margin: 10px auto;
  border: 0;
  color: black;
  font-size: ${props => props.fontSize};
  overflow: hidden;
  overflow-wrap: break-word;
`;
