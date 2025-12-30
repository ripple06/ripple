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
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #424242;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
`;
