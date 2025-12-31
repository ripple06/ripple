import styled from "@emotion/styled";

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0;
  overflow: hidden;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const LoadingText = styled.div`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

export const MarkerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 1000;
  transform: translate(0, 0);
`;

export const MarkerImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 6px;
  background-color: #f0f0f0;
`;

export const MarkerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MarkerNameLabel = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #212121;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
  background-color: #ffebee;
`;

export const ErrorTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #c62828;
  margin-bottom: 12px;
`;

export const ErrorText = styled.div`
  font-size: 1rem;
  color: #c62828;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 16px;
`;

export const ErrorHint = styled.div`
  font-size: 0.9rem;
  color: #666;
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  line-height: 1.6;
  max-width: 500px;
  text-align: left;
`;