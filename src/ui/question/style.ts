import styled from "@emotion/styled";

export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  height: 100vh;
  max-height: 932px;
  background-color: white;
  overflow: hidden;
`;

export const Header = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #212121;
  white-space: pre-wrap;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const InputArea = styled.div`
  position: relative;
  width: 90%;
  height: 180px;
  background: linear-gradient(135deg, #E7E9FB 0%, #F3EDFB 100%);
  border-radius: 20px;
  padding: 1.5rem;
  margin-left: 20px;

  &::before {
    content: '';
    position: absolute;
    bottom: 20px;
    left: -8px;
    width: 20px;
    height: 15px;
    background: #E7E9FB;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  color: #212121;
  
  &::placeholder {
    color: #9e9e9e;
  }
`;

export const CompleteButton = styled.button`
  width: calc(100% - 3rem);
  height: 56px;
  background-color: #7364FE;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  bottom: 120px;
  left: 1.5rem;
  
  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`;
