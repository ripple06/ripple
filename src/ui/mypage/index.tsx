"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function MyPage() {
    const router = useRouter();
    const [nickname, setNickname] = useState("");
    const [mbti, setMbti] = useState("");
    const [userInfo, setUserInfo] = useState<{ id: number; name: string; mbti: string } | null>(null);

    useEffect(() => {
        const storedInfo = localStorage.getItem("user_info");
        if (storedInfo) {
            const parsed = JSON.parse(storedInfo);
            setUserInfo(parsed);
            setNickname(parsed.name);
            setMbti(parsed.mbti);
        }
    }, []);

    const handleUpdate = () => {
        if (nickname.trim().length <= 2) {
            alert("닉네임을 3글자 이상 입력해주세요.");
            return;
        }

        if (mbti.trim().length !== 4) {
            alert("MBTI를 4자리로 입력해주세요.");
            return;
        }

        if (!userInfo) return;

        const updatedInfo = {
            ...userInfo,
            name: nickname.trim(),
            mbti: mbti.trim().toUpperCase()
        };

        localStorage.setItem("user_info", JSON.stringify(updatedInfo));
        setUserInfo(updatedInfo);
        alert("프로필이 성공적으로 수정되었습니다.");
    };

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
                    <span>{userInfo?.name || "사용자"}</span>님, 환영합니다!
                </S.Title>

                <S.Section>
                    <S.SectionTitle>현재 나의 설정</S.SectionTitle>
                    <S.InputGroup>
                        <S.Input
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <S.Input
                            placeholder="MBTI"
                            value={mbti}
                            onChange={(e) => setMbti(e.target.value.toUpperCase())}
                        />
                    </S.InputGroup>
                    <S.ButtonGroup>
                        <S.SubmitButton onClick={handleUpdate}>수정하기</S.SubmitButton>
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