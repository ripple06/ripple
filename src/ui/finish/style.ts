import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const floatCrown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
`;


export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  overflow: hidden;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 430px;
  height: 100vh;
  max-height: 932px;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 20px;
  padding-top: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const ProgressBar = styled.div`
    flex: 1;
    height: 6px;
    background-color: #F0F0F0;
    border-radius: 3px;
    overflow: hidden;
`;

export const ProgressFill = styled.div`
    height: 100%;
    width: 100%;
    background-color: #7364FE;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212121;
  text-align: center;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export const Subtitle = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212121;
  text-align: center;
  margin-bottom: 40px;
`;

export const GraphicWrapper = styled.div`
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  animation: ${floatCrown} 3s ease-in-out infinite;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    padding: 0 20px;
    margin-bottom: 120px;
`;

export const HomeButton = styled.button`
    flex: 1;
    height: 56px;
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

export const RetryButton = styled.button`
    flex: 1;
    height: 56px;
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
