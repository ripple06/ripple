"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import * as S from "./style";

export default function SignUpSuccess() {
    const router = useRouter();

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="back" width={28} height={40} />
                    </S.BackButton>
                </S.Header>
                <S.Content>
                    <S.Title>
                        환영합니다! 지금부터{"\n"}
                        해양 계획을 따라가볼까요?
                    </S.Title>
                    <S.Subtitle>발길이 닿지 않던 곳에, 다시 닿기를</S.Subtitle>
                    <S.RocketWrapper>
                        <Image src="/rocket.svg" alt="rocket" width={348} height={348} />
                    </S.RocketWrapper>
                </S.Content>
                <S.BubbleWrapper top="-10%" left="40%" size="60px" delay="0s">
                    <Image src="/Cbubble.svg" alt="bubble" width={400} height={400} />
                </S.BubbleWrapper>
                <S.BubbleWrapper top="35%" left="75%" size="80px" delay="1s">
                    <Image src="/Cbubble.svg" alt="bubble" width={80} height={80} />
                </S.BubbleWrapper>
                <S.BubbleWrapper top="30%" left="25%" size="70px" delay="1.5s">
                    <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                </S.BubbleWrapper>
                <S.BubbleWrapper top="50%" left="-10%" size="100px" delay="2s">
                    <Image src="/Cbubble.svg" alt="bubble" width={280} height={280} />
                </S.BubbleWrapper>
                <S.BubbleWrapper top="80%" left="25%" size="70px" delay="1.5s">
                    <Image src="/Cbubble.svg" alt="bubble" width={100} height={100} />
                </S.BubbleWrapper>
                <S.BottomButton onClick={() => router.push("/main")}>
                    시작하기
                </S.BottomButton>
            </S.Container>
        </S.Layout>
    );
}
