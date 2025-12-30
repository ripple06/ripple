"use client";

import { useRouter } from "next/navigation";
import * as S from "./style";
import Image from "next/image";

export default function SignUp() {
    const router = useRouter();

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
                        <S.Input placeholder="2글자 이상 입력해주세요" />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label>MBTI<span>*</span></S.Label>
                        <S.Input placeholder="ISTP" />
                    </S.InputGroup>
                    <S.BottomButton onClick={() => router.push("/success")}>다음</S.BottomButton>
                </S.Form>
            </S.Container>
        </S.Layout>
    );
}
