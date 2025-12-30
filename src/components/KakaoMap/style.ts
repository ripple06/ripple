import styled from "@emotion/styled";

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const CoordBoxContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;

interface CoordBoxProps {
  variant?: 'start' | 'end';
}

export const CoordBox = styled.div<CoordBoxProps>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  border: 1px solid ${props => props.variant === 'end' ? 'rgba(255, 82, 82, 0.2)' : 'rgba(115, 100, 254, 0.2)'};
  width: 100%;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${props => props.variant === 'end' ? '#FF5252' : '#7364FE'};
  }

  strong {
    font-size: 0.9rem;
    color: #212121;
    font-family: 'monospace';
  }
`;

export const ResetButton = styled.button`
  background: #7364FE;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(115, 100, 254, 0.3);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;
