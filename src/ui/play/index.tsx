"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

const QUESTIONS = [
    {
        id: 1,
        question: "바다의 물은 왜 짠맛이 날까요?",
        options: ["소금이 들어 있어서", "설탕이 들어 있어서", "물고기 때문", "햇빛 때문"],
        correctIndex: 0,
        explanation: "바닷물에는 염화나트륨(소금) 등 다양한 미네랄이 녹아 있어 짠맛과 쓴맛이 납니다."
    },
    {
        id: 2,
        question: "지구에서 가장 넓은 바다는 어디일까요?",
        options: ["태평양", "대서양", "인도양", "북극해"],
        correctIndex: 0,
        explanation: "태평양은 지구 전체 표면적의 약 3분의 1을 차지하는 가장 넓은 대양입니다."
    },
    {
        id: 3,
        question: "바다 속에서 가장 큰 포유류는?",
        options: ["흰긴수염고래", "상어", "돌고래", "바다거북"],
        correctIndex: 0,
        explanation: "대왕고래(흰긴수염고래)는 몸길이 30m, 무게 100톤이 넘는 현존 지구상 최대 동물입니다."
    },
    {
        id: 4,
        question: "바다의 밀물과 썰물은 무엇 때문에 생길까요?",
        options: ["달의 인력", "바람", "물고기의 이동", "지구의 자전"],
        correctIndex: 0,
        explanation: "밀물과 썰물은 주로 달과 태양의 인력(조석력)에 의해 해수면이 오르내리는 현상입니다."
    },
    {
        id: 5,
        question: "바다 밑에 있는 아주 깊은 지형을 무엇이라 부를까요?",
        options: ["해구", "해수욕장", "대륙붕", "해령"],
        correctIndex: 0,
        explanation: "해구는 수심 6,000m 이상인 좁고 긴 움푹한 지형을 말하며, 가장 깊은 곳은 마리아나 해구입니다."
    }
];

export default function QuizPlay() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    const handleSelect = (index: number) => {
        if (isConfirmed) return;
        setSelectedOption(index);
        setIsConfirmed(true);
    };

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsConfirmed(false);
        } else {
            router.push("/quiz/finish");
        }
    };

    const getOptionStatus = (index: number) => {
        if (!isConfirmed) return 'none';
        if (index === currentQuestion.correctIndex) return 'correct';
        if (index === selectedOption) return 'wrong';
        return 'none';
    };

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="back" width={26} height={40} />
                    </S.BackButton>
                    <S.ProgressBar>
                        <S.ProgressFill progress={progress} />
                    </S.ProgressBar>
                </S.Header>
                <S.Content>
                    <S.QuestionNumber>Q{currentQuestion.id}. {currentQuestion.question}</S.QuestionNumber>
                    <S.OptionList>
                        {currentQuestion.options.map((option, index) => (
                            <S.OptionItem
                                key={index}
                                selected={selectedOption === index}
                                status={getOptionStatus(index)}
                                onClick={() => handleSelect(index)}
                            >
                                <span>A.</span>
                                <span>{option}</span>
                            </S.OptionItem>
                        ))}
                    </S.OptionList>

                    {isConfirmed && (
                        <S.ExplanationBox>
                            <h3>{selectedOption === currentQuestion.correctIndex ? "정답입니다!" : "오답 설명"}</h3>
                            <p>{currentQuestion.explanation}</p>
                        </S.ExplanationBox>
                    )}
                </S.Content>

                <S.BottomButton
                    disabled={!isConfirmed}
                    onClick={handleNext}
                >
                    {currentIndex === QUESTIONS.length - 1 ? "완료" : "다음"}
                </S.BottomButton>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
