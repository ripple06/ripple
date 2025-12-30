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
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const defaultCenter = new window.kakao.maps.LatLng(37.566826, 126.9786567);

                const initializeMap = (center: any) => {
                    const options = {
                        center: center,
                        level: 3
                    };
                    if (mapContainer.current) {
                        const map = new window.kakao.maps.Map(mapContainer.current, options);

                        // 클릭 이벤트 리스너 등록
                        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
                            const latlng = mouseEvent.latLng;
                            const newPoint = {
                                lat: latlng.getLat(),
                                lng: latlng.getLng()
                            };

                            // 시작 지점이 없으면 시작 지점 설정, 있으면 도착 지점 설정
                            setStartPoint(prev => {
                                if (prev) {
                                    // 이미 시작지점이 있으면 도착지점을 설정 (비동기적으로 실행됨)
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
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const currentCenter = new window.kakao.maps.LatLng(lat, lon);
                            initializeMap(currentCenter);
                        },
                        (error) => {
                            console.error("Geolocation error:", error);
                            initializeMap(defaultCenter);
                        }
                    );
                } else {
                    initializeMap(defaultCenter);
                }
            });
        };

        if (window.kakao && window.kakao.maps) {
            onLoadKakaoMap();
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
                        <strong>{startPoint.lat.toFixed(6)}, {startPoint.lng.toFixed(6)}</strong>
                    </S.CoordBox>
                )}
                {endPoint && (
                    <S.CoordBox variant="end">
                        <span>도착지점</span>
                        <strong>{endPoint.lat.toFixed(6)}, {endPoint.lng.toFixed(6)}</strong>
                    </S.CoordBox>
                )}
                {(startPoint || endPoint) && (
                    <S.ResetButton onClick={resetPoints}>초기화</S.ResetButton>
                )}
            </S.CoordBoxContainer>
        </S.MapWrapper>
    );
}