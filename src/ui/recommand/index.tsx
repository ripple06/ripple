"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import CourseMap from "@/components/CourseMap";
import * as S from "./style";
import { api, SeaEmotionResponse, Course } from "@/lib/api";

export default function Recommand() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRecentMode = searchParams.get('mode') === 'recent';
    
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [step, setStep] = useState<'selection' | 'analyzing' | 'complete' | 'preferences' | 'courses'>('selection');
    const [seaEmotionData, setSeaEmotionData] = useState<SeaEmotionResponse | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourses, setIsLoadingCourses] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courseError, setCourseError] = useState<string | null>(null);
    const [panelHeight, setPanelHeight] = useState(200); // 기본 높이 (접힌 상태)
    const [isResizing, setIsResizing] = useState(false);
    const [userMbti, setUserMbti] = useState<string | null>(null); // 사용자 MBTI
    
    // 사용자 선호도 정보
    const [userPreferences, setUserPreferences] = useState({
        travelPurpose: '', // 여행 목적
        travelStyle: '', // 여행 스타일
        companion: '', // 동반자
        activityPreference: '', // 활동 선호도
        budget: '', // 예산
        transportation: '', // 이동 수단
        duration: '', // 여행 시간
        customPrompt: '', // 사용자 커스텀 프롬프트
    });

    const regions = ["사하구", "기장군", "영도구", "남구", "서구"];

    // 패널 리사이즈 핸들러
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            
            const windowHeight = window.innerHeight;
            const newHeight = windowHeight - e.clientY;
            const minHeight = 100;
            const maxHeight = windowHeight * 0.7; // 최대 70%
            
            setPanelHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

    // 컴포넌트 마운트 시 localStorage에서 MBTI 가져오기 (마이페이지에서 저장한 값)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedMbti = localStorage.getItem('mbti');
                if (storedMbti) {
                    setUserMbti(storedMbti);
                    console.log('✅ MBTI 불러오기 성공 (recommand):', storedMbti);
                } else {
                    console.log('localStorage에 MBTI 없음 (recommand)');
                }
            } catch (err) {
                console.error('❌ MBTI 불러오기 오류 (recommand):', err);
            }
        }
    }, []);

    // 최근 코스 모드일 때 localStorage에서 최근 코스 불러오기
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // URL 파라미터 확인 (클라이언트 사이드에서만)
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        const isRecent = mode === 'recent';
        
        if (isRecent) {
            console.log('최근 코스 모드 활성화');
            try {
                const recentCourseData = localStorage.getItem('recentCourse');
                console.log('localStorage에서 가져온 데이터:', recentCourseData);
                
                if (recentCourseData) {
                    const parsed = JSON.parse(recentCourseData);
                    console.log('파싱된 데이터:', parsed);
                    
                    if (parsed.courses && Array.isArray(parsed.courses) && parsed.courses.length > 0) {
                        console.log('코스 개수:', parsed.courses.length);
                        setCourses(parsed.courses);
                        setSelectedCourse(parsed.courses[0]);
                        setSelectedRegion(parsed.region || null);
                        setSeaEmotionData(parsed.seaEmotion || null);
                        setStep('courses'); // 바로 코스 표시 단계로 이동
                        console.log('✅ 최근 코스 불러오기 성공');
                    } else {
                        console.warn('저장된 코스 배열이 비어있거나 유효하지 않음');
                        setCourseError('저장된 최근 코스가 없습니다.');
                        setStep('courses');
                    }
                } else {
                    console.warn('localStorage에 최근 코스 데이터 없음');
                    setCourseError('저장된 최근 코스가 없습니다.');
                    setStep('courses');
                }
            } catch (err) {
                console.error('❌ 최근 코스 불러오기 오류:', err);
                setCourseError('최근 코스를 불러오는 중 오류가 발생했습니다: ' + (err instanceof Error ? err.message : String(err)));
                setStep('courses');
            }
        }
    }, []);

    const handleRegionClick = (region: string) => {
        if (selectedRegion === region) {
            setSelectedRegion(null);
        } else {
            setSelectedRegion(region);
        }
    };

    const handleNext = async () => {
        if (selectedRegion) {
            setStep('analyzing');
            setIsLoading(true);
            setError(null);
            
            try {
                // 바다 기분 분석 API 호출
                const seaEmotionResponse = await api.seaemotion.get(selectedRegion);
                setSeaEmotionData(seaEmotionResponse);
                setIsLoading(false);
                setStep('complete'); // 바다 분석 완료 후 complete 단계로 이동
            } catch (err: any) {
                console.error('바다 기분 분석 API 오류:', err);
                setError(err.message || '바다 기분 분석 중 오류가 발생했습니다.');
                setIsLoading(false);
                setStep('complete');
            }
        }
    };

    const handleGetCourses = async () => {
        if (!selectedRegion || !seaEmotionData) {
            setCourseError('지역과 바다 기분 정보가 필요합니다.');
            return;
        }

        // 로딩 시작 - preferences 화면을 숨기고 로딩 화면 표시
        setIsLoadingCourses(true);
        setCourseError(null);
        setStep('courses'); // courses 단계로 이동 (로딩 화면이 표시됨)
        
        try {
            // user_preferences 객체 생성 (빈 값 제외)
            const preferences: any = {};
            if (userPreferences.travelPurpose) preferences.travel_purpose = userPreferences.travelPurpose;
            if (userPreferences.travelStyle) preferences.travel_style = userPreferences.travelStyle;
            if (userPreferences.companion) preferences.companion = userPreferences.companion;
            if (userPreferences.activityPreference) preferences.activity_preference = userPreferences.activityPreference;
            if (userPreferences.budget) preferences.budget = userPreferences.budget;
            if (userPreferences.transportation) preferences.transportation = userPreferences.transportation;
            if (userPreferences.duration) preferences.duration = userPreferences.duration;
            if (userPreferences.customPrompt) preferences.custom_prompt = userPreferences.customPrompt;
            
            // AI 코스 추천 API 호출 (limit=1)
            const coursesResponse = await api.courses.aiRecommend({
                location: selectedRegion,
                seaEmotion: {
                    emotion: seaEmotionData.emotion,
                    name: seaEmotionData.name,
                },
                mbti: userMbti || undefined, // MBTI 추가
                userPreferences: Object.keys(preferences).length > 0 ? preferences : undefined,
                limit: 1, // 코스 1개만 추천
            });
            
            if (coursesResponse.courses && coursesResponse.courses.length > 0) {
                setCourses(coursesResponse.courses);
                setSelectedCourse(coursesResponse.courses[0]); // 첫 번째 코스 자동 선택
                setIsLoadingCourses(false); // 로딩 완료
                
                // 최근 코스를 localStorage에 저장
                try {
                    if (typeof window !== 'undefined') {
                        const recentCourseData = {
                            courses: coursesResponse.courses,
                            region: selectedRegion,
                            seaEmotion: seaEmotionData,
                            timestamp: new Date().toISOString(),
                        };
                        const jsonString = JSON.stringify(recentCourseData);
                        localStorage.setItem('recentCourse', jsonString);
                        console.log('✅ 최근 코스 저장 완료');
                        console.log('저장된 코스 개수:', coursesResponse.courses.length);
                        console.log('저장된 데이터 크기:', jsonString.length, 'bytes');
                        
                        // 저장 확인
                        const saved = localStorage.getItem('recentCourse');
                        if (saved) {
                            console.log('✅ localStorage 저장 확인 성공');
                        } else {
                            console.error('❌ localStorage 저장 확인 실패');
                        }
                    }
                } catch (err) {
                    console.error('❌ 최근 코스 저장 오류:', err);
                    if (err instanceof Error) {
                        console.error('에러 메시지:', err.message);
                        console.error('에러 스택:', err.stack);
                    }
                }
            } else {
                throw new Error('추천된 코스가 없습니다.');
            }
        } catch (err: any) {
            console.error('코스 추천 API 오류:', err);
            setCourseError(err.message || '코스 추천 중 오류가 발생했습니다.');
            setIsLoadingCourses(false);
        }
    };

    return (
        <S.Layout>
            {step === 'preferences' && !isLoadingCourses ? (
                <S.PreferencesContainer>
                    <S.PreferencesHeader>
                        <S.BackButton onClick={() => setStep('complete')}>
                            <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                        </S.BackButton>
                        <S.PreferencesTitle>추가 정보 입력</S.PreferencesTitle>
                    </S.PreferencesHeader>
                    
                    <S.PreferencesContent>
                        <S.PreferencesSubtitle>
                            더 나은 코스 추천을 위해<br />정보를 입력해주세요 (선택사항)
                        </S.PreferencesSubtitle>
                        
                        {/* 여행 목적 */}
                        <S.QuestionSection>
                            <S.QuestionTitle>여행 목적은 무엇인가요?</S.QuestionTitle>
                            <S.OptionGrid>
                                {['휴양', '체험', '탐험', '사진', '맛집', '운동'].map((option) => (
                                    <S.OptionButton
                                        key={option}
                                        selected={userPreferences.travelPurpose === option}
                                        onClick={() => setUserPreferences(prev => ({
                                            ...prev,
                                            travelPurpose: prev.travelPurpose === option ? '' : option
                                        }))}
                                    >
                                        {option}
                                    </S.OptionButton>
                                ))}
                            </S.OptionGrid>
                        </S.QuestionSection>
                        
                        {/* 여행 스타일 */}
                        <S.QuestionSection>
                            <S.QuestionTitle>어떤 스타일로 여행하시나요?</S.QuestionTitle>
                            <S.OptionGrid>
                                {['혼자', '커플', '가족', '친구', '단체'].map((option) => (
                                    <S.OptionButton
                                        key={option}
                                        selected={userPreferences.travelStyle === option}
                                        onClick={() => setUserPreferences(prev => ({
                                            ...prev,
                                            travelStyle: prev.travelStyle === option ? '' : option
                                        }))}
                                    >
                                        {option}
                                    </S.OptionButton>
                                ))}
                            </S.OptionGrid>
                        </S.QuestionSection>
                        
                        {/* 활동 선호도 */}
                        <S.QuestionSection>
                            <S.QuestionTitle>어떤 활동을 선호하시나요?</S.QuestionTitle>
                            <S.OptionGrid>
                                {['액티비티', '쉼', '문화', '맛집', '쇼핑', '산책'].map((option) => (
                                    <S.OptionButton
                                        key={option}
                                        selected={userPreferences.activityPreference === option}
                                        onClick={() => setUserPreferences(prev => ({
                                            ...prev,
                                            activityPreference: prev.activityPreference === option ? '' : option
                                        }))}
                                    >
                                        {option}
                                    </S.OptionButton>
                                ))}
                            </S.OptionGrid>
                        </S.QuestionSection>
                        
                        {/* 예산 */}
                        <S.QuestionSection>
                            <S.QuestionTitle>예산은 어느 정도인가요?</S.QuestionTitle>
                            <S.OptionGrid>
                                {['저예산', '보통', '고급'].map((option) => (
                                    <S.OptionButton
                                        key={option}
                                        selected={userPreferences.budget === option}
                                        onClick={() => setUserPreferences(prev => ({
                                            ...prev,
                                            budget: prev.budget === option ? '' : option
                                        }))}
                                    >
                                        {option}
                                    </S.OptionButton>
                                ))}
                            </S.OptionGrid>
                        </S.QuestionSection>
                        
                        {/* 이동 수단 */}
                        <S.QuestionSection>
                            <S.QuestionTitle>주로 어떤 이동 수단을 사용하시나요?</S.QuestionTitle>
                            <S.OptionGrid>
                                {['도보', '자전거', '대중교통', '차량'].map((option) => (
                                    <S.OptionButton
                                        key={option}
                                        selected={userPreferences.transportation === option}
                                        onClick={() => setUserPreferences(prev => ({
                                            ...prev,
                                            transportation: prev.transportation === option ? '' : option
                                        }))}
                                    >
                                        {option}
                                    </S.OptionButton>
                                ))}
                            </S.OptionGrid>
                        </S.QuestionSection>
                        
                            {/* 여행 시간 */}
                            <S.QuestionSection>
                                <S.QuestionTitle>여행 시간은?</S.QuestionTitle>
                                <S.OptionGrid>
                                    {['1-2시간', '반나절', '하루', '여러날'].map((option) => (
                                        <S.OptionButton
                                            key={option}
                                            selected={userPreferences.duration === option}
                                            onClick={() => setUserPreferences(prev => ({
                                                ...prev,
                                                duration: prev.duration === option ? '' : option
                                            }))}
                                        >
                                            {option}
                                        </S.OptionButton>
                                    ))}
                                </S.OptionGrid>
                            </S.QuestionSection>
                            
                            {/* 커스텀 프롬프트 */}
                            <S.QuestionSection>
                                <S.QuestionTitle>추가로 원하는 코스 특징이나 요구사항이 있으신가요?</S.QuestionTitle>
                                <S.PromptTextarea
                                    placeholder="예: 조용한 해변, 사진 찍기 좋은 곳, 맛집 위주 등 자유롭게 입력해주세요"
                                    value={userPreferences.customPrompt}
                                    onChange={(e) => setUserPreferences(prev => ({
                                        ...prev,
                                        customPrompt: e.target.value
                                    }))}
                                    rows={4}
                                />
                            </S.QuestionSection>
                        </S.PreferencesContent>
                    
                    <S.PreferencesFooter>
                        <S.SkipButton onClick={handleGetCourses}>건너뛰기</S.SkipButton>
                        <S.SubmitButton onClick={handleGetCourses}>완료</S.SubmitButton>
                    </S.PreferencesFooter>
                </S.PreferencesContainer>
            ) : (
                <S.Container>
                    <S.Header>
                        <S.BackButton onClick={() => router.back()}>
                            <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                        </S.BackButton>
                    </S.Header>
                    {step === 'selection' ? (
                    <>
                        <S.Title>
                            원하시는 부산 내 지역을<br />
                            선택해주세요.
                        </S.Title>
                        <S.GridContainer>
                            {regions.map((region) => (
                                <S.RegionButton
                                    key={region}
                                    selected={selectedRegion === region}
                                    onClick={() => handleRegionClick(region)}
                                >
                                    {region}
                                </S.RegionButton>
                            ))}
                        </S.GridContainer>
                        {selectedRegion && (
                            <S.NextButtonWrapper>
                                <S.NextButton onClick={handleNext}>다음</S.NextButton>
                            </S.NextButtonWrapper>
                        )}
                    </>
                ) : step === 'courses' && isLoadingCourses ? (
                    <S.AnalysisContainer>
                        {/* 구름 애니메이션: 코스 추천 중일 때만 표시 */}
                        <S.BubbleWrapper top="-2%" left="40%" size="100px" delay="0s">
                            <Image src="/Cbubble.svg" alt="bubble" width={400} height={400} />
                        </S.BubbleWrapper>
                        <S.BubbleWrapper top="45%" left="75%" size="80px" delay="1s">
                            <Image src="/Cbubble.svg" alt="bubble" width={80} height={80} />
                        </S.BubbleWrapper>
                        <S.BubbleWrapper top="40%" left="15%" size="70px" delay="1.5s">
                            <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                        </S.BubbleWrapper>
                        <S.BubbleWrapper top="60%" left="-10%" size="100px" delay="2s">
                            <Image src="/Cbubble.svg" alt="bubble" width={280} height={280} />
                        </S.BubbleWrapper>
                        <S.BubbleWrapper top="80%" left="65%" size="70px" delay="1.5s">
                            <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                        </S.BubbleWrapper>
                        <S.AnalysisText>
                            <h1>
                                AI가 최적의 코스를<br />
                                찾고 있어요.
                            </h1>
                            <p>당신에게 맞는 코스를 추천하고 있어요</p>
                        </S.AnalysisText>
                        <S.WaveImageContainer>
                            <Image src="/wave.svg" alt="wave" width={320} height={320} priority />
                        </S.WaveImageContainer>
                    </S.AnalysisContainer>
                ) : step === 'courses' && !isLoadingCourses ? null : (
                    <S.AnalysisContainer>
                        {/* 구름 애니메이션: 바다 분석 중일 때만 표시 */}
                        {isLoading && (
                            <>
                                <S.BubbleWrapper top="-2%" left="40%" size="100px" delay="0s">
                                    <Image src="/Cbubble.svg" alt="bubble" width={400} height={400} />
                                </S.BubbleWrapper>
                                <S.BubbleWrapper top="45%" left="75%" size="80px" delay="1s">
                                    <Image src="/Cbubble.svg" alt="bubble" width={80} height={80} />
                                </S.BubbleWrapper>
                                <S.BubbleWrapper top="40%" left="15%" size="70px" delay="1.5s">
                                    <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                                </S.BubbleWrapper>
                                <S.BubbleWrapper top="60%" left="-10%" size="100px" delay="2s">
                                    <Image src="/Cbubble.svg" alt="bubble" width={280} height={280} />
                                </S.BubbleWrapper>
                                <S.BubbleWrapper top="80%" left="65%" size="70px" delay="1.5s">
                                    <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                                </S.BubbleWrapper>
                            </>
                        )}
                        <S.AnalysisText>
                            <h1>
                                {isLoading ? (
                                    <>
                                        바다의 오늘 기분을<br />
                                        분석하고 있어요.
                                    </>
                                ) : (
                                    <>
                                        바다의 오늘 기분을<br />
                                        분석을 완료했어요.
                                    </>
                                )}
                            </h1>
                            {step === 'complete' && seaEmotionData && !isLoadingCourses && (
                                <S.ResultContainer>
                                    <S.ResultEmotion>{seaEmotionData.emotion}</S.ResultEmotion>
                                    <S.ResultName>{seaEmotionData.name}</S.ResultName>
                                    {seaEmotionData.message && (
                                        <S.ResultMessage>{seaEmotionData.message}</S.ResultMessage>
                                    )}
                                </S.ResultContainer>
                            )}
                            {error && !isLoadingCourses && (
                                <S.ErrorText>{error}</S.ErrorText>
                            )}
                            {courseError && (
                                <S.ErrorText>{courseError}</S.ErrorText>
                            )}
                            <p>
                                {isLoading
                                    ? "오늘 바다의 컨디션을 확인 중이에요"
                                    : isLoadingCourses
                                    ? "당신에게 맞는 코스를 추천하고 있어요"
                                    : "오늘 바다의 컨디션을 확인 후 코스를 추천해요"}
                            </p>
                        </S.AnalysisText>
                        <S.WaveImageContainer>
                            <Image src="/wave.svg" alt="wave" width={320} height={320} priority />
                        </S.WaveImageContainer>
                    </S.AnalysisContainer>
                )}
                    {step === 'complete' && !isLoadingCourses && (
                        <S.ButtonWrapper>
                            <S.NextButton onClick={() => setStep('preferences')}>코스 추천</S.NextButton>
                        </S.ButtonWrapper>
                    )}
                    {step === 'courses' && !isLoadingCourses && (
                    <S.CoursesContainer>
                        {courseError ? (
                            <S.ErrorContainer>
                                <S.EmptyContainer>
                                    <S.EmptyText>{courseError}</S.EmptyText>
                                    {isRecentMode && (
                                        <S.NextButton onClick={() => {
                                            router.push('/recommand');
                                            setCourseError(null);
                                        }}>
                                            새 코스 추천받기
                                        </S.NextButton>
                                    )}
                                </S.EmptyContainer>
                            </S.ErrorContainer>
                        ) : selectedCourse ? (
                            <S.CourseLayout>
                                {/* 지도 영역 - 상단 */}
                                <S.MapSection>
                                    <S.MapHeader>
                                        <S.BackButton onClick={() => setStep('complete')}>
                                            <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                                        </S.BackButton>
                                        <S.MapTitle>{selectedCourse.name}</S.MapTitle>
                                    </S.MapHeader>
                                    <CourseMap
                                        courses={courses}
                                        selectedCourse={selectedCourse}
                                        onCourseSelect={setSelectedCourse}
                                    />
                                </S.MapSection>
                                
                                {/* 코스 정보 패널 - 하단 (접을 수 있음) */}
                                <S.ResizablePanelContainer
                                    style={{ height: `${panelHeight}px` }}
                                >
                                    <S.PanelResizer
                                        onMouseDown={(e) => {
                                            setIsResizing(true);
                                            e.preventDefault();
                                        }}
                                    >
                                        <S.ResizerHandle className="resizer-handle" />
                                    </S.PanelResizer>
                                    <S.CourseInfoPanel>
                                        <S.CourseInfoHeader>
                                            <S.CourseTitle>{selectedCourse.name}</S.CourseTitle>
                                            <S.CourseMetaInfo>
                                                <span>거리: {selectedCourse.totalDistance.toFixed(1)}km</span>
                                                {selectedCourse.duration && (
                                                    <span>소요 시간: {selectedCourse.duration}</span>
                                                )}
                                            </S.CourseMetaInfo>
                                        </S.CourseInfoHeader>
                                        
                                        {/* 경로 정보 */}
                                        {selectedCourse.paths && selectedCourse.paths.length > 0 && (
                                            <S.PathSection>
                                                <S.SectionTitle>경로</S.SectionTitle>
                                                <S.PathList>
                                                    {selectedCourse.paths.map((point, index) => (
                                                        <S.PathItem key={index}>
                                                            <S.PathNumber>{index + 1}</S.PathNumber>
                                                            <S.PathContent>
                                                                <S.PathImageContainer>
                                                                    {point.image ? (
                                                                        <S.PathImage src={point.image} alt={point.name || `경유지 ${index + 1}`} />
                                                                    ) : (
                                                                        <S.PathImagePlaceholder>
                                                                            <S.PlaceholderIcon>📍</S.PlaceholderIcon>
                                                                        </S.PathImagePlaceholder>
                                                                    )}
                                                                </S.PathImageContainer>
                                                                <S.PathInfo>
                                                                    <S.PathName>{point.name || `경유지 ${index + 1}`}</S.PathName>
                                                                    {point.description && (
                                                                        <S.PathDescription>{point.description}</S.PathDescription>
                                                                    )}
                                                                </S.PathInfo>
                                                            </S.PathContent>
                                                        </S.PathItem>
                                                    ))}
                                                </S.PathList>
                                            </S.PathSection>
                                        )}
                                        
                                        <S.CourseDetailsSection>
                                            {selectedCourse.reason && (
                                                <S.RecommendationReason>
                                                    <S.SectionTitle>추천 이유</S.SectionTitle>
                                                    <S.ReasonText>{selectedCourse.reason}</S.ReasonText>
                                                </S.RecommendationReason>
                                            )}
                                            
                                            {selectedCourse.description && (
                                                <S.CourseDescription>
                                                    <S.SectionTitle>코스 소개</S.SectionTitle>
                                                    <S.DescriptionText>{selectedCourse.description}</S.DescriptionText>
                                                </S.CourseDescription>
                                            )}
                                            
                                            {selectedCourse.highlights && selectedCourse.highlights.length > 0 && (
                                                <S.CourseHighlights>
                                                    <S.SectionTitle>하이라이트</S.SectionTitle>
                                                    <S.HighlightsList>
                                                        {selectedCourse.highlights.map((highlight, index) => (
                                                            <S.HighlightItem key={index}>
                                                                <S.HighlightBullet>•</S.HighlightBullet>
                                                                <span>{highlight}</span>
                                                            </S.HighlightItem>
                                                        ))}
                                                    </S.HighlightsList>
                                                </S.CourseHighlights>
                                            )}
                                        </S.CourseDetailsSection>
                                        
                                        <S.CourseDetailButton onClick={() => router.push(`/result/detail/${selectedCourse.courseId}`)}>
                                            코스 상세보기
                                        </S.CourseDetailButton>
                                    </S.CourseInfoPanel>
                                </S.ResizablePanelContainer>
                            </S.CourseLayout>
                        ) : (
                            <S.EmptyContainer>
                                <S.EmptyText>추천할 코스가 없습니다.</S.EmptyText>
                            </S.EmptyContainer>
                        )}
                    </S.CoursesContainer>
                    )}
                    <BottomNav />
                </S.Container>
            )}
        </S.Layout>
    );
}