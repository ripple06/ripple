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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 430px;
  height: 100vh;
  max-height: 932px; 
  padding: 6rem 2rem 8rem; 
  overflow: hidden;
  background: linear-gradient(180deg, #A7ACFF 0%, #B0ABFF 40%, #E0C3FF 100%);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 10; 
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fafafa;
  line-height: 1.4;
  white-space: pre-wrap;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 2px #2121211a;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  text-shadow: 2px 2px 2px #2121211a;
`;

export const BottomSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

export const TooltipBubble = styled.div`
  position: absolute;
  bottom: calc(100% + 16px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #212121;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  z-index: 20;

  animation: floatUpDown 1.8s ease-in-out infinite;

  @keyframes floatUpDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    border-width: 8px 6px 0;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

const BaseBubble = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  animation: float 8s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-16px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export const BubbleTopRight = styled(BaseBubble)`
  top: -15%;
  right: -35%;
  width: 400px;
  height: 400px;
  animation-duration: 10s;
`;

export const BubbleMiddleLeft = styled(BaseBubble)`
  top: 35%;
  left: -0.3%;
  width: 100px;
  height: 100px;
  animation-duration: 6s;
  animation-delay: -2s;
`;

export const BubbleBottomRight = styled(BaseBubble)`
  bottom: 10%;
  right: -10%;
  width: 200px;
  height: 200px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 1.35rem;
  border-radius: 4px;
  background-color: #7B61FF;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;

  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 0.8s ease-out forwards;
  animation-delay: 0.2s;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LoginButtonWrapper = styled.div`
  width: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
`;