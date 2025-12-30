"use client";

import { useEffect, useRef, useState } from "react";
import * as S from "./style";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function KakaoMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const polylineRef = useRef<any>(null);

    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(null);

    // 1️⃣ Kakao SDK 로드 및 지도 초기화
    useEffect(() => {
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