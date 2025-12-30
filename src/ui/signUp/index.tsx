import { useRouter } from "next/navigation";
import * as S from "./style";
import Image from "next/image";
import { useState } from "react";
import { VALID_MBTI_TYPES } from "@/constants/mbti";
import customAxios from "@/utils/customAxios";

export default function SignUp() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [mbti, setMbti] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            // 1. 회원가입 API 호출
            const signupResponse = await customAxios.post<any>(
                `/api/signup`,
                { name: trimmedName, password: trimmedPassword }
            );

            const userData = signupResponse.data;
            console.log("[SignUp] Backend response:", userData);
            
            // 2. 사용자 ID 생성 (이름 기반 해시)
            // 이름을 해시해서 숫자 ID로 변환 (같은 이름이면 같은 ID)
            let hash = 0;
            for (let i = 0; i < trimmedName.length; i++) {
                const char = trimmedName.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            const userId = Math.abs(hash);
            console.log("[SignUp] Generated user ID from name:", userId, "for name:", trimmedName);

            // 3. 로컬스토리지에 사용자 정보 저장 (MBTI 포함)
            const userInfo = { id: userId, name: trimmedName, mbti: trimmedMbti };
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            console.log("[SignUp] User info saved to localStorage:", userInfo);

            // 4. 성공 페이지 이동
            router.push("/success");
        } catch (err: any) {
            let errMsg = "오류가 발생했습니다. 다시 시도해주세요.";
            if (err.response?.data) {
                const errorData = err.response.data;
                errMsg = errorData.detail || errorData.message || errorData.error || errMsg;
            } else if (err.message) {
                errMsg = err.message;
            }
            setError(errMsg);
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
