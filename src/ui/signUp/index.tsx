import { useRouter } from "next/navigation";
import * as S from "./style";
import Image from "next/image";
import { useState } from "react";
import { VALID_MBTI_TYPES } from "@/constants/mbti";

export default function SignUp() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [mbti, setMbti] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const trimmedName = userName.trim();
        const trimmedMbti = mbti.trim();

        if (trimmedName.length <= 2) {
            setError("닉네임을 3글자 이상 입력해주세요.");
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

        // ID 자동 증가 로직
        const lastId = localStorage.getItem("last_user_id");
        const newId = lastId ? parseInt(lastId) + 1 : 1;

        const userInfo = {
            id: newId,
            name: trimmedName,
            mbti: trimmedMbti.toUpperCase()
        };

        localStorage.setItem("user_info", JSON.stringify(userInfo));
        localStorage.setItem("last_user_id", newId.toString());
        router.push("/success");
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
                    <S.BottomButton onClick={handleLogin}>다음</S.BottomButton>
                </S.Form>
            </S.Container>
        </S.Layout>
    );
}
