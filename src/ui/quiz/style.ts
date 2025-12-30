import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const floatBubble = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const floatRocket = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(5px, -15px); }
  100% { transform: translate(0, 0); }
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

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(115, 100, 254, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 50px;
    left: -100px;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(115, 100, 254, 0.08) 0%, rgba(255, 255, 255, 0) 75%);
    z-index: 0;
  }
`;

export const Header = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  z-index: 1;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212121;
  text-align: center;
  line-height: 1.4;
  white-space: pre-wrap;
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #9e9e9e;
  text-align: center;
  margin-bottom: 40px;
`;

export const GraphicWrapper = styled.div`
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const NextButton = styled.button`
  width: calc(100% - 40px);
  height: 56px;
  background-color: #7364FE;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0 20px;
  margin-bottom: 120px;
  z-index: 1;
  
  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
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
  z-index: 3;
  
  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`;

export const RocketWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatRocket} 3s ease-in-out infinite;
`;