import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const floatRocket = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const floatBubble = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
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

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 10;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212121;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #9e9e9e;
  text-align: center;
  margin-bottom: 4rem;
`;

export const RocketWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatRocket} 3s ease-in-out infinite;
`;

export const BubbleWrapper = styled.div<{ top: string; left: string; size: string; delay: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  animation: ${floatBubble} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.6;
  z-index: 1;
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