"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
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
    coursePath?: { lat: number; lng: number; title: string }[];
}

export interface KakaoMapHandle {
    setCenterToUser: () => void;
}

const KakaoMap = forwardRef<KakaoMapHandle, Props>(({ attractions, onCenterChange, coursePath }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const customOverlaysRef = useRef<any[]>([]);
    const polylineRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        setCenterToUser: () => {
            if (navigator.geolocation && mapRef.current) {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        const userPos = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        mapRef.current.panTo(userPos);
                    },
                    err => {
                        console.warn("Geolocation error:", err);
                        alert("현재 위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.");
                    }
                );
            }
        }
    }));

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
                const defaultCenter = new window.kakao.maps.LatLng(35.1795543, 129.0756416); // 부산 중심
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

                    // 현재 위치 중심 로직 제거 (사용자가 '현재 내 위치' 버튼을 누를 때만 동작하도록 함)
                    /*
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            pos => {
                                const userPos = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                                mapRef.current.setCenter(userPos);
                            },
                            err => console.warn("Geolocation error:", err)
                        );
                    }
                    */
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

    // 2-1) 코스 경로 그리기 (외부 prop coursePath 이용)
    useEffect(() => {
        if (!mapRef.current || !window.kakao || !coursePath || coursePath.length === 0) return;

        const kakao = window.kakao;

        // 기존 마커/폴리라인 제거 (이 컴포넌트 내에서 start/end point와 겹치지 않게 별도 관리 필요하나, 
        // 현재는 start/end point 로직이 사용자 상호작용용이고, coursePath는 보기용이므로 충돌 가능성 낮음.
        // 다만 깨끗하게 하려면 별도 ref 배열 관리 추천)

        // 간단 구현: coursePath가 들어오면 지도 중심 이동 및 그리기

        const points = coursePath.map(p => new kakao.maps.LatLng(p.lat, p.lng));

        // 마커 생성
        coursePath.forEach(p => {
            new kakao.maps.Marker({
                map: mapRef.current,
                position: new kakao.maps.LatLng(p.lat, p.lng),
                title: p.title
            });
        });

        // 선 그리기
        new kakao.maps.Polyline({
            map: mapRef.current,
            path: points,
            strokeWeight: 5,
            strokeColor: '#7364FE', // main brand color
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
        });

        // 지도 범위 재설정
        const bounds = new kakao.maps.LatLngBounds();
        points.forEach(p => bounds.extend(p));
        mapRef.current.setBounds(bounds);

    }, [coursePath]);

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
});

export default KakaoMap;