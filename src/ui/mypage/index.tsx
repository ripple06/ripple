"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function MyPage() {
    const router = useRouter();
    const [nickname, setNickname] = useState("");
    const [mbti, setMbti] = useState("");

    const comments = [
        "이번 여행은 정말 값진 여행이였습니다. 이번 여행은 정말 값진 여행이였습니다. 이번 여행은 정말 값진 여행이였습니다.",
        "이번 여행은 정말 값진 여행이였습니다. 이번 여행은 정말 값진 여행이였습니다. 이번 여행은 정말 값진 여행이였습니다.",
        "이번 여행은 정말 값진 여행이였습니다. 이번 여행은 정말 값진 여행이였습니다."
    ];

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="back" width={26} height={40} />
                    </S.BackButton>
                </S.Header>

                <S.Title>
                    <span>김예빈</span>님, 환영합니다!
                </S.Title>

                <S.Section>
                    <S.SectionTitle>현재 나의 설정</S.SectionTitle>
                    <S.InputGroup>
                        <S.Input
                            placeholder="김예빈"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <S.Input
                            placeholder="ISTP"
                            value={mbti}
                            onChange={(e) => setMbti(e.target.value)}
                        />
                    </S.InputGroup>
                    <S.ButtonGroup>
                        <S.SubmitButton>수정하기</S.SubmitButton>
                        <S.CancelButton onClick={() => router.push("/main")}>취소</S.CancelButton>
                    </S.ButtonGroup>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>이때 동안 남긴 댓글</S.SectionTitle>
                    <S.CommentList>
                        {comments.map((comment, index) => (
                            <S.CommentBubble key={index}>
                                {comment}
                            </S.CommentBubble>
                        ))}
                    </S.CommentList>
                </S.Section>
                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}