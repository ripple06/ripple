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
  width: 100%;
  max-width: 430px;
  height: 100vh;
  max-height: 932px;
  background-color: white;
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 20px;
  padding-top: 20px;
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

export const Content = styled.div`
  padding: 0 24px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #212121;
  line-height: 1.3;
  margin-bottom: 20px;
  white-space: pre-wrap;

  span {
    color: #7364FE;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.5;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const InfoItem = styled.div`
  background-color: #f5f5ff;
  border: 1px solid #e0e0ff;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #5c4dff;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #424242;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: keep-all;
  margin-bottom: 30px;
`;

export const LinkButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #F8F9FA;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
