"use client";

import * as S from "./style";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <S.Layout>
      <S.Container>
        <S.BubbleTopRight>
          <Image src="/bubble.svg" alt="Bubble" layout="fill" />
        </S.BubbleTopRight>
        <S.BubbleMiddleLeft>
          <Image src="/bubble.svg" alt="Bubble" layout="fill" />
        </S.BubbleMiddleLeft>
        <S.BubbleBottomRight>
          <Image src="/bubble.svg" alt="Bubble" layout="fill" />
        </S.BubbleBottomRight>
        <S.ContentWrapper>
          <S.Title>
            너의 진심이{"\n"}
            물결처럼{"\n"}
            번지는 곳
          </S.Title>
          <S.Subtitle>바다 기반 여행 계획 추천</S.Subtitle>
        </S.ContentWrapper>
        <S.BottomSection>
          <S.TooltipBubble>3초만에 하는 회원가입 🚀</S.TooltipBubble>
          <S.LoginButtonWrapper>
            <S.LoginButton onClick={() => router.push("/signUp")}>로그인</S.LoginButton>
          </S.LoginButtonWrapper>
        </S.BottomSection>
      </S.Container>
    </S.Layout>
  );
}