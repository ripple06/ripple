"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import * as S from "./style";
import BottomNav from "@/components/BottomNav";

export default function Quiz() {
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
                        바다에 대한 퀴즈를{"\n"}
                        풀어보아요.
                    </S.Title>
                    <S.Subtitle>다양한 질문들이 5가지 등장합니다.</S.Subtitle>
                    <S.RocketWrapper>
                        <Image src="/what.svg" alt="what" width={348} height={348} />
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
                <S.BottomButton onClick={() => router.push("/quizPlay")}>
                    시작하기
                </S.BottomButton>
                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}