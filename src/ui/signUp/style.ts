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
  padding: 2rem 1.5rem;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #212121;
  white-space: pre-wrap;

  span {
    color: #7B61FF;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #9e9e9e;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 0.2rem;

  span {
    color: #ff6b6b; 
    margin-left: 2px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-color: #7B61FF;
  }
`;

export const BottomButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #7B61FF;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background-color: #6a52e0;
  }
  
  &:disabled {
    background-color: #d1c4e9;
    cursor: not-allowed;
  }
`;
