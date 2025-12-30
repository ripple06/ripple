import styled from "@emotion/styled";

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  /* Custom Overlay Styles */
  .custom-overlay {
    position: relative;
    pointer-events: auto;
  }

  .overlay-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    width: 120px;
    display: flex;
    flex-direction: column;
    border: 2px solid white;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      z-index: 100;
    }
  }

  .overlay-image-wrapper {
    width: 100%;
    height: 80px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: crop;
    }
  }

  .overlay-content {
    padding: 6px 8px;
    background: white;
    text-align: center;
  }

  .overlay-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #333;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Triangle pointer */
  .overlay-card::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
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
