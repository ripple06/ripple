import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const floatBubble = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatWave = keyframes`
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
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    line-height: 1.4;
    white-space: pre-wrap;
    margin-left: 20px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 20px;
    margin-top: 20px;
`;

export const RegionButton = styled.button<{ selected?: boolean }>`
    width: 100%;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid ${props => props.selected ? "#7B61FF" : "#E0E0E0"};
    background-color: ${props => props.selected ? "#ECE6FF" : "#FFFFFF"};
    color: ${props => props.selected ? "#7B61FF" : "#000000"};
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s;
    
    &:hover {
        background-color: ${props => props.selected ? "#ECE6FF" : "#F9F9F9"};
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const NextButton = styled.button`
    margin: 24px;
    width: 90%;
    margin-top: auto;
    margin-bottom: 140px;
    height: 52px;
    background-color: #7B61FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s;
    z-index: 3;
    
    &:active {
        background-color: #6A4FEF;
        transform: scale(0.95);
    }
    
    animation: ${fadeIn} 0.5s ease-out;
`;

export const AnalysisContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    position: relative;
    overflow: hidden;
`;

export const AnalysisText = styled.div`
    text-align: center;
    animation: ${fadeIn} 0.8s ease-out;
    z-index: 10;
    
    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 12px;
        line-height: 1.4;
        white-space: pre-wrap;
    }
    
    p {
        font-size: 0.9rem;
        color: #9e9e9e;
    }
`;

export const WaveImageContainer = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 1s ease-out 0.2s backwards, ${floatWave} 3s ease-in-out infinite 1.2s;
    z-index: 10;
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