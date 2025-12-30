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
    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        // 1️⃣ Kakao SDK 동적 로드
        if (!window.kakao) {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
            script.async = true;

            script.onload = () => {
                initializeKakaoMap();
            };

            document.head.appendChild(script);
        } else {
            initializeKakaoMap();
        }

        function initializeKakaoMap() {
            window.kakao.maps.load(() => {
                const defaultCenter = new window.kakao.maps.LatLng(37.566826, 126.9786567);

                const initializeMap = (center: any) => {
                    const options = { center, level: 3 };
                    if (mapContainer.current) {
                        const map = new window.kakao.maps.Map(mapContainer.current, options);

                        // 지도 클릭 이벤트
                        window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
                            const latlng = mouseEvent.latLng;
                            const newPoint = {
                                lat: latlng.getLat(),
                                lng: latlng.getLng(),
                            };

                            setStartPoint(prev => {
                                if (prev) {
                                    setEndPoint(newPoint);
                                    return prev;
                                }
                                return newPoint;
                            });
                        });
                    }
                };

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const currentCenter = new window.kakao.maps.LatLng(lat, lon);
                            initializeMap(currentCenter);
                        },
                        error => {
                            console.error("Geolocation error:", error);
                            initializeMap(defaultCenter);
                        }
                    );
                } else {
                    initializeMap(defaultCenter);
                }
            });
        }
    }, []);

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