import styled from "@emotion/styled";

export const BottomNavWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 20px rgba(0,0,0,0.05);
  z-index: 20;
  padding-bottom: 4px;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  
  span {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${props => props.active ? "#7B61FF" : "#9e9e9e"};
  }
`;

export const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
        display: block;
    }
`;