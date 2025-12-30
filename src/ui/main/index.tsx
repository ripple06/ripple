"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import * as S from "./style";
import BottomNav from "@/components/BottomNav";
import KakaoMap, { KakaoMapHandle } from "@/components/KakaoMap";
import Image from "next/image";
import { fetchNearbyAttractions, Attraction } from "@/utils/tourism";
import { REGION_DATA } from "@/constants/regionData";

export default function Main() {
    const mapRef = useRef<KakaoMapHandle>(null);
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    const region = searchParams.get('region');

    const coursePath = useMemo(() => {
        const regionCourses = region ? REGION_DATA[region]?.courses : null;
        return regionCourses ? regionCourses.map(c => ({ lat: c.lat, lng: c.lng, title: c.name })) : undefined;
    }, [region]);

    // 백엔드 데이터 동기화 로직
    useEffect(() => {
        const syncUserData = async () => {
            const storedInfo = localStorage.getItem("user_info");
            if (!storedInfo) return;

            const userInfo = JSON.parse(storedInfo);

            try {
                // 1. 서버에서 MBTI 정보가 있는지 확인 (프록시를 통해 요청)
                const checkRes = await fetch(`/api/remote/mbti/${userInfo.id}`);
                if (!checkRes.ok && checkRes.status === 404) {
                    // 서버에 정보가 없으면 로컬 정보를 전송 (동기화)
                    console.log("[Sync] Pushing local MBTI to server...");
                    await fetch(`/api/remote/mbti/${userInfo.id}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ mbti: userInfo.mbti })
                    });
                }
            } catch (err) {
                console.error("[Sync] Failed to sync with backend:", err);
            }
        };

        syncUserData();
    }, []);

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

    const handleCenterToUser = () => {
        mapRef.current?.setCenterToUser();
        setIsMenuOpen(false);
    };

    return (
        <S.Layout>
            <S.Container>
                <KakaoMap
                    ref={mapRef}
                    attractions={attractions}
                    onCenterChange={(lat: number, lng: number) => setMapCenter({ lat, lng })}
                    coursePath={coursePath}
                />
                {isMenuOpen && (
                    <S.TopLeftGroup>
                        <S.FloatingButton onClick={handleNearbySearch} disabled={isLoading}>
                            {isLoading ? "검색 중..." : "주변 볼거리"}
                        </S.FloatingButton>
                        <S.FloatingButton>최근 코스 불러오기</S.FloatingButton>
                        <S.FloatingButton onClick={handleCenterToUser}>현재 내 위치</S.FloatingButton>
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