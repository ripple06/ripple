import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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
  font-size: 1.75rem;
  font-weight: 600;
  color: #212121;
  white-space: pre-wrap;
  margin-left: 20px;
  margin-bottom: 2rem;
  
  span {
    color: #7364FE;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: #212121;
  }

  &:focus {
    border-color: #7B61FF;
  }
`;
export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`;

export const SubmitButton = styled.button`
    flex: 1;
    height: 52px;
    background-color: #7364FE;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    
    &:active {
        transform: scale(0.98);
        opacity: 0.9;
    }
`;

export const CancelButton = styled.button`
    flex: 1;
    height: 52px;
    background-color: white;
    color: #7364FE;
    border: 1px solid #7364FE;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;

    &:active {
        transform: scale(0.98);
    }
`;

export const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const CommentBubble = styled.div`
    position: relative;
    width: 100%;
    background: linear-gradient(135deg, #E7E9FB 0%, #F3EDFB 100%);
    border-radius: 20px;
    padding: 1.2rem 1.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #333;
    box-shadow: 0 4px 15px rgba(115, 100, 254, 0.05);

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
