"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { getRandomQuizzes, Quiz } from "@/utils/quizzes";
import * as S from "./style";

export default function QuizPlay() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getRandomQuizzes(5);
                setQuizzes(data);
            } catch (error) {
                console.error("Failed to fetch quizzes:", error);
                alert("퀴즈를 불러오는데 실패했습니다.");
                router.back();
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizzes();
    }, [router]);

    if (isLoading || quizzes.length === 0) {
        return (
            <S.Layout>
                <S.Container>
                    <S.Content>
                        <p style={{ textAlign: "center", marginTop: "50%" }}>퀴즈를 불러오는 중...</p>
                    </S.Content>
                </S.Container>
            </S.Layout>
        );
    }

    const currentQuestion = quizzes[currentIndex];
    const progress = ((currentIndex + 1) / quizzes.length) * 100;

    const handleSelect = (index: number) => {
        if (isConfirmed) return;
        setSelectedOption(index);
        setIsConfirmed(true);
    };

    const handleNext = () => {
        if (currentIndex < quizzes.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsConfirmed(false);
        } else {
            router.push("/quiz/finish");
        }
    };

    const getOptionStatus = (index: number) => {
        if (!isConfirmed) return 'none';
        if (index === currentQuestion.correct) return 'correct';
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
                    <S.QuestionNumber>Q{currentQuestion.id}. {currentQuestion.title}</S.QuestionNumber>
                    <S.OptionList>
                        {currentQuestion.content.options.map((option, index) => (
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
                            <h3>{selectedOption === currentQuestion.correct ? "정답입니다!" : "오답입니다"}</h3>
                            <p>
                                {selectedOption === currentQuestion.correct
                                    ? "축하합니다! 정답을 맞추셨습니다."
                                    : `정답은 "${currentQuestion.content.options[currentQuestion.correct]}"입니다.`}
                            </p>
                        </S.ExplanationBox>
                    )}
                </S.Content>

                <S.BottomButton
                    disabled={!isConfirmed}
                    onClick={handleNext}
                >
                    {currentIndex === quizzes.length - 1 ? "완료" : "다음"}
                </S.BottomButton>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
