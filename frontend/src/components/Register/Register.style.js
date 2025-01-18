import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fafafa;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  /* &:hover {
    background-color: rgb(0, 123, 206); */
  /* } */
`;

export const SignUpLink = styled.p`
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
