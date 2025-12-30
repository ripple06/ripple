import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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
  background-color: #e0e0e0;
  background-image: url('/map-placeholder.png')
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const TopLeftGroup = styled.div`
  position: absolute;
  top: 60vh;
  left: 1.5rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  white-space: nowrap;
  animation: ${slideUp} 0.3s ease-out;
  
  &:active {
    background-color: #f8f8ff;
  }
`;

export const CurrentLocationButton = styled.button`
  position: absolute;
  bottom: 120px;
  z-index: 10;
  padding: 0.8rem 1.2rem;
  background-color: white;
  border: 1px solid #7B61FF;
  border-radius: 8px;
  color: #7B61FF;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const MenuButton = styled.button`
  position: absolute;
  bottom: 120px;
  left: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #7B61FF;
  color: #7B61FF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.9);
  }
`;