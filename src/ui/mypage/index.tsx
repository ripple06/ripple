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

    // 닉네임이 같은 유저 검색 → user_id로 상태 셋 → 안전하게 최신 name/mbti도 db에 저장(자동 반영, 킵)
    useEffect(() => {
        async function fetchAndSyncUser() {
            try {
                // 자동으로 킵: localStorage 기반 우선 기본(prefill)값 확보
                let localName = "";
                let localMbti = "";
                const storedInfo = localStorage.getItem("user_info");
                if (storedInfo) {
                    try {
                        const parsed = JSON.parse(storedInfo);
                        localName = parsed.name || "";
                        localMbti = parsed.mbti || "";
                    } catch {}
                }

                // 닉네임을 결정한다: 킵/자동이니까 localStorage→필드값→""
                const queryName = localName || nickname || "";
                if (!queryName) {
                    setUserInfo(null);
                    setNickname("");
                    setMbti("");
                    return;
                }

                // 닉네임이 같은 유저 하나 찾기
                const res = await fetch(`/api/mbti/list?name=${encodeURIComponent(queryName)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    let errorDetail: string | undefined = undefined;
                    try {
                        const errData = await res.json();
                        errorDetail = errData?.detail;
                    } catch {}
                    throw new Error(errorDetail || "유저 정보를 불러오는 데 실패했습니다.");
                }

                // 같은 닉네임 가진 유저 중 하나
                const users = await res.json();
                if (!Array.isArray(users) || users.length === 0) {
                    // 못 찾으면 신규 아예 킵 못함
                    setUserInfo(null);
                    setNickname(queryName);
                    setMbti(localMbti);
                    return;
                }
                const foundUser = users[0];

                // 최신 정보로 우선적 셋
                setUserInfo(foundUser);
                setNickname(localName || foundUser.name || "");
                setMbti(localMbti || foundUser.mbti || "");

                // 자동 킵: db정보가 local과 다르면 db에 덮어쓰기(최신으로)
                // 즉, 항상 자동 저장(sync)! (단, id가 있을 때만)
                if (foundUser.id && (localMbti !== foundUser.mbti || localName !== foundUser.name || !storedInfo)) {
                    try {
                        const toSave = {
                            mbti: localMbti || foundUser.mbti || "",
                            name: localName || foundUser.name || "",
                        };
                        await fetch(`/api/mbti/${foundUser.id}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(toSave)
                        });
                        // 킵: localStorage도 최신 상태로
                        const updatedInfo = {
                            id: foundUser.id,
                            ...toSave
                        };
                        localStorage.setItem("user_info", JSON.stringify(updatedInfo));
                        setUserInfo(updatedInfo);
                        setNickname(updatedInfo.name);
                        setMbti(updatedInfo.mbti);
                    } catch (err) {
                        // 자동 킵 실패시에도 무시(네트워크)
                    }
                }
            } catch (err) {
                // fallback: localStorage라도 반영
                const storedInfo = localStorage.getItem("user_info");
                if (storedInfo) {
                    try {
                        const parsed = JSON.parse(storedInfo);
                        setUserInfo(parsed);
                        setNickname(parsed.name || "");
                        setMbti(parsed.mbti || "");
                    } catch {}
                }
            }
        }
        fetchAndSyncUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 자동 킵이라 handleUpdate는 필요없음
    // 대신 그냥 폼에 값 변경 자동저장 해주기
    useEffect(() => {
        if (!nickname && !mbti) return;
        // debounce용 타이머
        const tid = setTimeout(async () => {
            const trimmedNickname = nickname.trim();
            const trimmedMbti = mbti.trim().toUpperCase();

            if (trimmedNickname.length < 3 || trimmedMbti.length !== 4) return;
            if (!VALID_MBTI_TYPES.includes(trimmedMbti)) return;
            // userInfo가 존재할 때만
            if (!userInfo?.id) return;

            // 백엔드, 로컬 모두에 자동저장(킵)
            try {
                const toSave = {
                    mbti: trimmedMbti,
                    name: trimmedNickname,
                };
                await fetch(`/api/mbti/${userInfo.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(toSave),
                });
                // localStorage도 동기화
                const updatedInfo = { ...userInfo, ...toSave };
                localStorage.setItem("user_info", JSON.stringify(updatedInfo));
                setUserInfo(updatedInfo);
                setNickname(trimmedNickname);
                setMbti(trimmedMbti);
            } catch {}
        }, 400);
        return () => clearTimeout(tid);
        // userInfo는 id만 의존, nickname/mbti는 킵 자동화 위해 포함
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname, mbti, userInfo?.id]);

    // 수정/취소 버튼도 즉시 자동 킵이 되므로 실제론 필요 없지만, UI 유지는 그대로 둔다
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
                            onChange={e => setNickname(e.target.value)}
                        />
                        <S.Input
                            placeholder="MBTI"
                            value={mbti}
                            onChange={e => setMbti(e.target.value.toUpperCase())}
                        />
                    </S.InputGroup>
                    <S.ButtonGroup>
                        <S.SubmitButton disabled>
                            자동 저장됨
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