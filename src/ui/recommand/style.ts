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

export const NextButtonWrapper = styled.div`
    width: 100%;
    padding: 0 24px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    z-index: 100;
    position: relative;
`;

export const NextButton = styled.button`
    width: 100%;
    max-width: calc(100% - 48px);
    height: 52px;
    background-color: #7B61FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s;
    z-index: 100;
    position: relative;
    
    &:hover {
        background-color: #6A4FEF;
    }
    
    &:active {
        background-color: #5A3FDF;
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
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;
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

export const ButtonWrapper = styled.div`
    width: 100%;
    padding: 0 24px;
    margin-top: auto;
    margin-bottom: 140px;
    display: flex;
    justify-content: center;
    z-index: 100;
    position: relative;
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

export const ResultContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(135deg, #A7ACFF 0%, #B0ABFF 50%, #E0C3FF 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
`;

export const ResultEmotion = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.2;
`;

export const ResultName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
`;

export const ResultMessage = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  line-height: 1.5;
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  margin: 16px 0;
  padding: 12px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const CoursesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const CourseLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const CoursesHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const CoursesTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
`;

export const CoursesList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 40vh;
  overflow-y: auto;
`;

export const CourseCard = styled.div<{ selected?: boolean }>`
  padding: 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? "#7B61FF" : "#E0E0E0"};
  background-color: ${props => props.selected ? "#ECE6FF" : "#FFFFFF"};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.selected ? "#7B61FF" : "#B0B0B0"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const CourseName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
`;

export const CourseInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  gap: 12px;
`;

export const MapSection = styled.div`
  width: 100%;
  flex: 1;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  flex-shrink: 0;
`;

export const MapHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  pointer-events: none;
  
  button {
    pointer-events: auto;
  }
`;

export const MapTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

export const CourseDetailButton = styled.button`
  margin: 20px;
  margin-top: 0;
  padding: 16px;
  background-color: #7B61FF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #6A4FEF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(123, 97, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  flex-direction: column;
  gap: 16px;
`;

export const LoadingText = styled.div`
  font-size: 1rem;
  color: #666;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const ErrorContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  flex-direction: column;
  gap: 16px;
`;

export const EmptyText = styled.div`
  font-size: 1rem;
  color: #999;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 16px;
  z-index: 15;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(123, 97, 255, 0.2);
  border-top: 4px solid #7B61FF;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingSpinnerText = styled.p`
  font-size: 0.9rem;
  color: #7B61FF;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

export const ResizablePanelContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 5;
  display: flex;
  flex-direction: column;
  transition: height 0.2s ease;
`;

export const PanelResizer = styled.div`
  width: 100%;
  height: 8px;
  cursor: row-resize;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #7B61FF;
    
    .resizer-handle {
      background-color: #ffffff;
    }
  }
  
  &:active {
    background-color: #6A4FEF;
  }
`;

export const ResizerHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #999;
  border-radius: 2px;
  transition: background-color 0.2s;
`;

export const CourseInfoPanel = styled.div`
  width: 100%;
  height: calc(100% - 8px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const CourseInfoHeader = styled.div`
  padding: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const CourseTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 12px;
  line-height: 1.4;
`;

export const CourseMetaInfo = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.9rem;
  color: #666;
  
  span {
    display: flex;
    align-items: center;
  }
`;

export const CourseDetailsSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RecommendationReason = styled.div`
  background: linear-gradient(135deg, #ECE6FF 0%, #F5F0FF 100%);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(123, 97, 255, 0.2);
`;

export const CourseDescription = styled.div`
  padding: 0;
`;

export const CourseHighlights = styled.div`
  padding: 0;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 12px;
`;

export const ReasonText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #424242;
  margin: 0;
`;

export const DescriptionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

export const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
`;

export const HighlightBullet = styled.span`
  color: #7B61FF;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4;
  flex-shrink: 0;
`;

export const PathSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

export const PathList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const PathItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border-left: 4px solid #7B61FF;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateX(4px);
  }
`;

export const PathNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7B61FF 0%, #6A4FEF 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

export const PathContent = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const PathImageContainer = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`;

export const PathImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  background-color: #e0e0e0;
`;

export const PathImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, #ECE6FF 0%, #F5F0FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #7B61FF;
`;

export const PlaceholderIcon = styled.div`
  font-size: 2rem;
  opacity: 0.6;
`;

export const PathInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PathName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
  line-height: 1.4;
`;

export const PathDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

export const PreferencesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #ffffff;
  z-index: 100;
`;

export const PreferencesHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const PreferencesTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
`;

export const PreferencesContent = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 140px; /* Footer 높이 + 여유 공간 */
  overflow-y: auto;
`;

export const PreferencesSubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  margin-bottom: 8px;
`;

export const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const QuestionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #212121;
  margin: 0;
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? "#7B61FF" : "#E0E0E0"};
  background-color: ${props => props.selected ? "#ECE6FF" : "#FFFFFF"};
  color: ${props => props.selected ? "#7B61FF" : "#212121"};
  font-size: 0.95rem;
  font-weight: ${props => props.selected ? "600" : "500"};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${props => props.selected ? "#7B61FF" : "#B0B0B0"};
    background-color: ${props => props.selected ? "#ECE6FF" : "#F9F9F9"};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PreferencesFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  padding: 16px 20px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

export const SkipButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #B0B0B0;
    background-color: #F9F9F9;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #7B61FF;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #6A4FEF;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PromptTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #212121;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7B61FF;
    background-color: #F9F9F9;
  }
  
  &::placeholder {
    color: #999;
  }
`;