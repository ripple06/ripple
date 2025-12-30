"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function Question() {
    const router = useRouter();
    const [question, setQuestion] = useState("");

    // 진행 중인 코스가 없으면 접근 제한
    useEffect(() => {
        const currentCourse = localStorage.getItem("current_course");
        if (!currentCourse) {
            alert("진행 중인 코스가 없어 쪽지를 남길 수 없습니다.");
            router.push("/main");
        }
    }, [router]);

    const handleComplete = () => {
        if (!question.trim()) {
            alert("쪽지를 입력해주세요.");
            return;
        }

        const storedComments = localStorage.getItem("my_comments");
        const comments = storedComments ? JSON.parse(storedComments) : [];
        comments.unshift(question.trim());
        localStorage.setItem("my_comments", JSON.stringify(comments));

        router.push("/main");

        // 쪽지 작성 후 코스 완료 처리 (로컬 스토리지 삭제)
        localStorage.removeItem("current_course");
    };

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                    </S.BackButton>
                </S.Header>
                <S.Title>
                    여행 코스를 완료한 후{"\n"}다음 사람에게 쪽지를 남기세요.
                </S.Title>

                <S.InputArea>
                    <S.TextArea
                        placeholder="100자 이하"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        maxLength={100}
                    />
                </S.InputArea>

                <S.CompleteButton onClick={handleComplete}>
                    완료
                </S.CompleteButton>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}