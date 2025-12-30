"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VALID_MBTI_TYPES } from "@/constants/mbti";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function MyPage() {
    const router = useRouter();
    const [nickname, setNickname] = useState("");
    const [mbti, setMbti] = useState("");
    const [userInfo, setUserInfo] = useState<{ id: number; name: string; mbti: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedInfo = localStorage.getItem("user_info");
        if (storedInfo) {
            const parsed = JSON.parse(storedInfo);
            setUserInfo(parsed);
            setNickname(parsed.name);

            // 서버에서 최신 MBTI 정보를 가져와 로컬 데이터 보완
            const fetchMbti = async () => {
                try {
                    const res = await fetch(`/api/mbti/${parsed.id}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.mbti && data.mbti !== parsed.mbti) {
                            const updated = { ...parsed, mbti: data.mbti };
                            setMbti(data.mbti);
                            setUserInfo(updated);
                            localStorage.setItem("user_info", JSON.stringify(updated));
                        } else {
                            setMbti(data.mbti || parsed.mbti);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch MBTI from server:", err);
                    setMbti(parsed.mbti); // Fallback to local
                }
            };
            fetchMbti();
        }
    }, []);

    const handleUpdate = async () => {
        const trimmedNickname = nickname.trim();
        const trimmedMbti = mbti.trim().toUpperCase();

        if (trimmedNickname.length <= 2) {
            alert("닉네임을 3글자 이상 입력해주세요.");
            return;
        }

        if (trimmedMbti.length !== 4) {
            alert("MBTI를 4자리로 입력해주세요.");
            return;
        }

        if (!VALID_MBTI_TYPES.includes(trimmedMbti)) {
            alert("유효하지 않은 MBTI 유형입니다.");
            return;
        }

        if (!userInfo) return;

        setIsLoading(true);
        try {
            // 1. Update MBTI on server
            const mbtiResponse = await fetch(`/api/remote/mbti/${userInfo.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mbti: trimmedMbti })
            });

            if (!mbtiResponse.ok) {
                throw new Error("서버에 MBTI를 저장하는 데 실패했습니다.");
            }

            // 2. Update local storage (nickname is currently local-only update)
            const updatedInfo = {
                ...userInfo,
                name: trimmedNickname,
                mbti: trimmedMbti
            };

            localStorage.setItem("user_info", JSON.stringify(updatedInfo));
            setUserInfo(updatedInfo);
            alert("프로필이 성공적으로 수정되었습니다.");
        } catch (err: any) {
            alert(err.message || "오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (userInfo) {
            setNickname(userInfo.name);
            setMbti(userInfo.mbti);
        }
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
                        <S.SubmitButton onClick={handleUpdate} disabled={isLoading}>
                            {isLoading ? "처리 중..." : "수정하기"}
                        </S.SubmitButton>
                        <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
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