"use client";

import { useState } from "react";
import * as S from "./style";
import BottomNav from "@/components/BottomNav";
import KakaoMap from "@/components/KakaoMap";
import Image from "next/image";

export default function Main() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <S.Layout>
            <S.Container>
                <KakaoMap />
                {isMenuOpen && (
                    <S.TopLeftGroup>
                        <S.FloatingButton>주변 볼거리</S.FloatingButton>
                        <S.FloatingButton>최근 코스 불러오기</S.FloatingButton>
                        <S.FloatingButton>현재 내 위치</S.FloatingButton>
                    </S.TopLeftGroup>
                )}
                <S.MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Image src="/more.svg" alt="more" width={24} height={24} />
                </S.MenuButton>
                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}