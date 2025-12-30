"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function Recommand() {
    const router = useRouter();
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [step, setStep] = useState<'selection' | 'analyzing' | 'complete'>('selection');

    const regions = ["사하구", "기장군", "영도구", "남구", "서구"];

    const handleRegionClick = (region: string) => {
        if (selectedRegion === region) {
            setSelectedRegion(null);
        } else {
            setSelectedRegion(region);
        }
    };

    const handleNext = () => {
        if (selectedRegion) {
            setStep('analyzing');
            setTimeout(() => {
                setStep('complete');
            }, 3000);
        }
    };

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                    </S.BackButton>
                </S.Header>
                {step === 'selection' ? (
                    <>
                        <S.Title>
                            원하시는 부산 내 지역을{"\n"}선택해주세요.
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
                            <S.NextButton onClick={handleNext}>다음</S.NextButton>
                        )}
                    </>
                ) : (
                    <S.AnalysisContainer>
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
                                {step === 'analyzing'
                                    ? "바다의 오늘 기분을\n분석하고 있어요."
                                    : "바다의 오늘 기분을\n 분석을 완료했어요."}
                            </h1>
                            <p>오늘 바다의 컨디션을 확인 후 코스를 추천해요</p>
                        </S.AnalysisText>
                        <S.WaveImageContainer>
                            <Image src="/wave.svg" alt="wave" width={320} height={320} priority />
                        </S.WaveImageContainer>
                        {step === 'complete' && (
                            <S.NextButton onClick={() => router.push('/result')}>다음</S.NextButton>
                        )}
                    </S.AnalysisContainer>
                )}
                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}