"use client";

import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { Attraction } from "@/utils/tourism";

declare global {
    interface Window {
        kakao: any;
    }
}

interface Props {
    attractions?: Attraction[];
    onCenterChange?: (lat: number, lng: number) => void;
}

export default function KakaoMap({ attractions, onCenterChange }: Props) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const customOverlaysRef = useRef<any[]>([]);
    const polylineRef = useRef<any>(null);

    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{
        lat: number; lng: number

    } | null>(null);

    // 1️⃣ Kakao SDK 로드 및 지도 초기화
    useEffect(() => {
        // Warn early if the JS SDK key is missing (helps debug prod builds where env wasn't inlined)
        if (!process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY) {
            console.error("NEXT_PUBLIC_KAKAO_APP_JS_KEY is not defined. Ensure it's set in Vercel (Production) and redeploy. The Kakao Maps SDK will not load without it.");
            return;
        }

        const loadKakaoScript = () => {
            if (!window.kakao) {
                const script = document.createElement("script");
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
                script.async = true;
                script.onload = () => initializeMap();
                document.head.appendChild(script);
            } else {
                initializeMap();
            }
        };

        const initializeMap = () => {
            window.kakao.maps.load(() => {
                const defaultCenter = new window.kakao.maps.LatLng(37.566826, 126.9786567);
                const options = { center: defaultCenter, level: 3 };

                if (mapContainer.current) {
                    mapRef.current = new window.kakao.maps.Map(mapContainer.current, options);

                    // 중심 좌표 변경 감지 (idle 이벤트는 이동이 끝났을 때 발생)
                    window.kakao.maps.event.addListener(mapRef.current, "idle", () => {
                        if (onCenterChange) {
                            const center = mapRef.current.getCenter();
                            onCenterChange(center.getLat(), center.getLng());
                        }
                    });

                    // 초기 중심 좌표 전달
                    if (onCenterChange) {
                        onCenterChange(defaultCenter.getLat(), defaultCenter.getLng());
                    }

                    // 지도 클릭 이벤트
                    window.kakao.maps.event.addListener(mapRef.current, "click", (mouseEvent: any) => {
                        const latlng = mouseEvent.latLng;
                        const newPoint = { lat: latlng.getLat(), lng: latlng.getLng() };

                        setStartPoint(prev => {
                            if (prev) {
                                setEndPoint(newPoint);
                                return prev;
                            }
                            return newPoint;
                        });
                    });

                    // 현재 위치 중심
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            pos => {
                                const userPos = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                                mapRef.current.setCenter(userPos);
                            },
                            err => console.warn("Geolocation error:", err)
                        );
                    }
                }
            });
        };

        loadKakaoScript();
    }, []);

    // 2️⃣ 마커 & 선 업데이트
    useEffect(() => {
        if (!mapRef.current || !window.kakao) return;

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 기존 선 제거
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
            polylineRef.current = null;
        }

        const kakao = window.kakao;

        // 시작 지점 마커
        if (startPoint) {
            const startMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(startPoint.lat, startPoint.lng),
                map: mapRef.current,
                title: "출발지",
            });
            markersRef.current.push(startMarker);
        }

        // 도착 지점 마커
        if (endPoint) {
            const endMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(endPoint.lat, endPoint.lng),
                map: mapRef.current,
                title: "도착지",
            });
            markersRef.current.push(endMarker);
        }

        // 두 지점 연결 선
        if (startPoint && endPoint) {
            polylineRef.current = new kakao.maps.Polyline({
                map: mapRef.current,
                path: [
                    new kakao.maps.LatLng(startPoint.lat, startPoint.lng),
                    new kakao.maps.LatLng(endPoint.lat, endPoint.lng),
                ],
                strokeWeight: 5,
                strokeColor: "#FF0000",
                strokeOpacity: 0.7,
                strokeStyle: "solid",
            });
        }
    }, [startPoint, endPoint]);

    // 3️⃣ 관광 정보 커스텀 오버레이 업데이트
    useEffect(() => {
        if (!mapRef.current || !window.kakao || !attractions) return;

        // 기존 오버레이 제거
        customOverlaysRef.current.forEach(overlay => overlay.setMap(null));
        customOverlaysRef.current = [];

        const kakao = window.kakao;

        attractions.forEach(attraction => {
            const position = new kakao.maps.LatLng(Number(attraction.mapy), Number(attraction.mapx));

            const content = `
                <div class="custom-overlay">
                    <div class="overlay-card">
                        <div class="overlay-image-wrapper">
                            <img src="${attraction.firstimage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=100&fit=crop'}" alt="${attraction.title}" />
                        </div>
                        <div class="overlay-content">
                            <span class="overlay-title">${attraction.title}</span>
                        </div>
                    </div>
                </div>
            `;

            const customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
                yAnchor: 1.2
            });

            customOverlay.setMap(mapRef.current);
            customOverlaysRef.current.push(customOverlay);
        });
    }, [attractions]);

    const resetPoints = () => {
        setStartPoint(null);
        setEndPoint(null);
    };

    return (
        <S.MapWrapper>
            <S.MapContainer ref={mapContainer} />
            <S.CoordBoxContainer>
                {startPoint && (
                    <S.CoordBox>
                        <span>시작지점</span>
                        <strong>
                            {startPoint.lat.toFixed(6)}, {startPoint.lng.toFixed(6)}
                        </strong>
                    </S.CoordBox>
                )}
                {endPoint && (
                    <S.CoordBox variant="end">
                        <span>도착지점</span>
                        <strong>
                            {endPoint.lat.toFixed(6)}, {endPoint.lng.toFixed(6)}
                        </strong>
                    </S.CoordBox>
                )}
                {(startPoint || endPoint) && (
                    <S.ResetButton onClick={resetPoints}>초기화</S.ResetButton>
                )}
            </S.CoordBoxContainer>
        </S.MapWrapper>
    );
}