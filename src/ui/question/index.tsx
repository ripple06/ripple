"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function Question() {
    const router = useRouter();
    const [question, setQuestion] = useState("");

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                    </S.BackButton>
                </S.Header>
                <S.Title>
                    여행 코스를 완료한 후{"\n"}다음 사람에게 질문을 남기세요.
                </S.Title>

                <S.InputArea>
                    <S.TextArea
                        placeholder="100자 이하"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        maxLength={100}
                    />
                </S.InputArea>

                <S.CompleteButton onClick={() => router.push("/main")}>
                    완료
                </S.CompleteButton>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}