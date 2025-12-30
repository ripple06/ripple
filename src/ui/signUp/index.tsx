import { useRouter } from "next/navigation";
import * as S from "./style";
import Image from "next/image";
import { useState } from "react";
import { VALID_MBTI_TYPES } from "@/constants/mbti";

export default function SignUp() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [mbti, setMbti] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        const trimmedName = userName.trim();
        const trimmedPassword = password.trim();
        const trimmedMbti = mbti.trim();

        if (trimmedName.length <= 2) {
            setError("닉네임을 3글자 이상 입력해주세요.");
            return;
        }

        if (trimmedPassword.length === 0) {
            setError("비밀번호를 입력해주세요.");
            return;
        }

        if (trimmedMbti.length !== 4) {
            setError("MBTI를 4자리로 입력해주세요.");
            return;
        }

        if (!VALID_MBTI_TYPES.includes(trimmedMbti.toUpperCase())) {
            setError("유효하지 않은 MBTI 유형입니다.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // 1. Signup
            const signupResponse = await fetch("/api/remote/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmedName, password: trimmedPassword })
            });

            if (!signupResponse.ok) {
                const errorData = await signupResponse.json();
                throw new Error(errorData.detail || "회원가입에 실패했습니다.");
            }

            const userData = await signupResponse.json();
            const userId = userData.id;

            // 2. Save MBTI
            const mbtiResponse = await fetch(`/api/remote/mbti/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mbti: trimmedMbti.toUpperCase() })
            });

            if (!mbtiResponse.ok) {
                console.error("Failed to save MBTI to server, but signup was successful.");
            }

            const userInfo = {
                id: userId,
                name: trimmedName,
                mbti: trimmedMbti.toUpperCase()
            };

            localStorage.setItem("user_info", JSON.stringify(userInfo));
            router.push("/success");
        } catch (err: any) {
            setError(err.message || "오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
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
                <S.TitleGroup>
                    <S.Title>
                        환영합니다!{"\n"}
                        <span>회원정보</span>를 입력해주세요.
                    </S.Title>
                    <S.Subtitle>서비스 이용을 위해 사용됩니다.</S.Subtitle>
                </S.TitleGroup>
                <S.Form>
                    <S.InputGroup>
                        <S.Label>닉네임<span>*</span></S.Label>
                        <S.Input
                            placeholder="3글자 이상 입력해주세요"
                            value={userName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserName(e.target.value);
                                if (error) setError("");
                            }}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label>비밀번호<span>*</span></S.Label>
                        <S.Input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value);
                                if (error) setError("");
                            }}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label>MBTI<span>*</span></S.Label>
                        <S.Input
                            placeholder="ISTP"
                            value={mbti}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setMbti(e.target.value.toUpperCase());
                                if (error) setError("");
                            }}
                        />
                    </S.InputGroup>
                    <S.ErrorMessage>{error}</S.ErrorMessage>
                    <S.BottomButton onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? "처리 중..." : "다음"}
                    </S.BottomButton>
                </S.Form>
            </S.Container>
        </S.Layout>
    );
}
