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

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #9e9e9e;
  margin-left: 20px;
  margin-top: 12px;
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
`;

export const CourseList = styled.div`
    position: relative;
    width: 100%;
    margin-top: 20px;
    height: 800px; /* Base height for 4 cards + zigzag */
    padding: 0 24px;
`;

export const CourseItemWrapper = styled.div<{ top: number; left?: number; right?: number }>`
    position: absolute;
    top: ${props => props.top}px;
    ${props => props.left !== undefined ? `left: ${props.left}px;` : `right: ${props.right}px;`}
    z-index: 2;
    cursor: pointer;
`;

export const CourseCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 160px;
    background-color: #F3F0FF;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(115, 100, 254, 0.1);
`;

export const CourseImage = styled.div`
    width: 100%;
    height: 140px;
    background-color: #D9D9D9;
    position: relative;
    overflow: hidden;
`;

export const CourseName = styled.div`
    padding: 12px;
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    background-color: #F3F0FF;
`;

export const ZigzagCanvas = styled.div`
    position: absolute;
    top: 80px;
    left: 100px;
    z-index: 1;
    pointer-events: none;

    img {
        display: block;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 24px;
    position: fixed;
    bottom: 160px;
    left: calc(50% - 215px);
    width: 430px;
    z-index: 20;
`;


export const ActionButton = styled.button`
    width: 100%;
    height: 52px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background-color: white;
    color: #7B61FF;
    border: 2px solid #7B61FF;
    transition: all 0.2s;
    
    &:hover {
        background-color: #F5F3FF;
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

export const FloatingMenuButton = styled.button`
    position: fixed;
    bottom: 140px;
    margin-left: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #7364FE;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(115, 100, 254, 0.2);
    z-index: 30;
    cursor: pointer;
    
    &:active {
        transform: scale(0.95);
    }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TopLeftGroup = styled.div`
  position: fixed;
  bottom: 210px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 20px;
`;

export const FloatingButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: white;
  border: 1px solid #7B61FF;
  border-radius: 8px;
  color: #7B61FF;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(115, 100, 254, 0.15);
  white-space: nowrap;
  animation: ${slideUp} 0.3s ease-out;
  
  &:active {
    background-color: #f8f8ff;
    transform: scale(0.98);
  }
`;