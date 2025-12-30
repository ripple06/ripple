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

    // .env에 설정한 백엔드 URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSignUp = async () => {
        const trimmedName = userName.trim();
        const trimmedPassword = password.trim();
        const trimmedMbti = mbti.trim().toUpperCase();

        // 유효성 검사
        if (trimmedName.length <= 2) {
            setError("닉네임을 3글자 이상 입력해주세요.");
            return;
        }

        if (trimmedPassword.length < 6) {
            setError("비밀번호는 6자리 이상 입력해주세요.");
            return;
        }

        if (trimmedMbti.length !== 4) {
            setError("MBTI를 4자리로 입력해주세요.");
            return;
        }

        if (!VALID_MBTI_TYPES.includes(trimmedMbti)) {
            setError("유효하지 않은 MBTI 유형입니다.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // 1. 회원가입
            const signupResponse = await fetch(`/signup`, {
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

            // 2. MBTI 저장
            const mbtiResponse = await fetch(`${API_URL}/users/${userId}/mbti`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mbti: trimmedMbti })
            });

            if (!mbtiResponse.ok) {
                const mbtiError = await mbtiResponse.json();
                setError(mbtiError.detail || "MBTI 저장에 실패했습니다.");
                setIsLoading(false);
                return;
            }

            // 3. localStorage 저장
            const userInfo = { id: userId, name: trimmedName, mbti: trimmedMbti };
            localStorage.setItem("user_info", JSON.stringify(userInfo));

            // 4. 성공 페이지 이동
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
                            onChange={(e) => {
                                setUserName(e.target.value);
                                if (error) setError("");
                            }}
                            disabled={isLoading}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label>비밀번호<span>*</span></S.Label>
                        <S.Input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError("");
                            }}
                            disabled={isLoading}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label>MBTI<span>*</span></S.Label>
                        <S.Input
                            placeholder="ISTP"
                            value={mbti}
                            onChange={(e) => {
                                setMbti(e.target.value.toUpperCase());
                                if (error) setError("");
                            }}
                            disabled={isLoading}
                        />
                    </S.InputGroup>
                    <S.ErrorMessage>{error}</S.ErrorMessage>
                    <S.BottomButton onClick={handleSignUp} disabled={isLoading}>
                        {isLoading ? "처리 중..." : "다음"}
                    </S.BottomButton>
                </S.Form>
            </S.Container>
        </S.Layout>
    );
}
