"use client";

import { useState } from "react";
import * as S from "./style";
import BottomNav from "@/components/BottomNav";
import KakaoMap from "@/components/KakaoMap";
import Image from "next/image";
import { fetchNearbyAttractions, Attraction } from "@/utils/tourism";

export default function Main() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    const handleNearbySearch = async () => {
        if (!mapCenter) {
            alert("지도의 중심 좌표를 가져올 수 없습니다.");
            return;
        }

        setIsLoading(true);
        const data = await fetchNearbyAttractions(mapCenter.lat, mapCenter.lng);
        setAttractions(data);
        setIsLoading(false);
        setIsMenuOpen(false);

        if (data.length === 0) {
            alert("주변에 검색된 관광 정보가 없습니다.");
        }
    };

    return (
        <S.Layout>
            <S.Container>
                <KakaoMap
                    attractions={attractions}
                    onCenterChange={(lat: number, lng: number) => setMapCenter({ lat, lng })}
                />
                {isMenuOpen && (
                    <S.TopLeftGroup>
                        <S.FloatingButton onClick={handleNearbySearch} disabled={isLoading}>
                            {isLoading ? "검색 중..." : "주변 볼거리"}
                        </S.FloatingButton>
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