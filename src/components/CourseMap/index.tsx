"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow, OverlayViewF } from "@react-google-maps/api";
import * as S from "./style";
import { Course } from "@/lib/api";

const libraries: ("drawing" | "geometry" | "places" | "visualization")[] = ["places"];

interface CourseMapProps {
    courses: Course[];
    selectedCourse?: Course | null;
    onCourseSelect?: (course: Course) => void;
}

export default function CourseMap({ courses, selectedCourse, onCourseSelect }: CourseMapProps) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [activeInfoWindow, setActiveInfoWindow] = useState<{ courseId: number; pointIndex: number | 'start' | 'end' } | null>(null);
    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 35.1796, lng: 129.0756 });
    const [mapZoom, setMapZoom] = useState(13);
    const [placePhotos, setPlacePhotos] = useState<Record<string, string>>({});

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });
    
    // API 키가 없을 때 경고
    useEffect(() => {
        if (!apiKey) {
            console.error('Google Maps API 키가 설정되지 않았습니다. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 환경 변수를 설정해주세요.');
        }
    }, [apiKey]);

    // 지도 로드 완료 시
    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        fitBounds();
    }, [courses, selectedCourse]);

    // 지도 범위 조정
    const fitBounds = useCallback(() => {
        if (!mapRef.current || courses.length === 0) return;

        const coursesToDisplay = selectedCourse ? [selectedCourse] : courses;
        const bounds = new google.maps.LatLngBounds();

        coursesToDisplay.forEach(course => {
            // paths 배열의 모든 포인트를 포함
            if (course.paths && course.paths.length > 0) {
                course.paths.forEach(point => {
                    if (point && point.lat !== undefined && point.lng !== undefined) {
                        bounds.extend({ lat: point.lat, lng: point.lng });
                    }
                });
            }
        });

        mapRef.current.fitBounds(bounds);
    }, [courses, selectedCourse]);

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            fitBounds();
        }
    }, [isLoaded, courses, selectedCourse, fitBounds]);

    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
    };

    const createMarkerIcon = (label: string, color: string, type: 'start' | 'path' | 'end' = 'path', imageUrl?: string) => {
        const size = type === 'path' ? 56 : 48;
        const pinHeight = 12;
        const totalHeight = size + pinHeight;
        
        // SVG를 사용한 커스텀 핀 모양 마커
        let svg = `
            <svg width="${size}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="shadow-${label}" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                    </filter>
                </defs>
        `;
        
        // 이미지가 있는 경우 배경으로 사용
        if (imageUrl && type === 'path') {
            svg += `
                <defs>
                    <pattern id="image-${label}" x="0" y="0" width="1" height="1">
                        <image href="${imageUrl}" x="0" y="0" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice"/>
                    </pattern>
                </defs>
                <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#image-${label})" stroke="${color}" stroke-width="3" filter="url(#shadow-${label})"/>
            `;
        } else {
            // 이미지가 없는 경우 색상 배경
            svg += `
                <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="${color}" stroke="#FFFFFF" stroke-width="3" filter="url(#shadow-${label})"/>
            `;
        }
        
        // 핀 하단 부분
        svg += `
                <path d="M ${size/2} ${totalHeight} L ${size/2 - 8} ${size} L ${size/2 + 8} ${size} Z" fill="${color}" filter="url(#shadow-${label})"/>
        `;
        
        // 번호/라벨 텍스트
        const fontSize = type === 'path' ? '18' : '16';
        svg += `
                <text x="${size/2}" y="${size/2 + 7}" font-family="Arial, sans-serif" font-size="${fontSize}px" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle" stroke="#000000" stroke-width="0.5" stroke-opacity="0.3">${label}</text>
            </svg>
        `;
        
        const encodedSvg = encodeURIComponent(svg);
        
        return {
            url: `data:image/svg+xml;charset=UTF-8,${encodedSvg}`,
            scaledSize: new google.maps.Size(size, totalHeight),
            anchor: new google.maps.Point(size / 2, totalHeight),
        };
    };

    if (loadError) {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        let errorMessage = '지도를 불러오는 중 오류가 발생했습니다.';
        
        if (!apiKey) {
            errorMessage = 'Google Maps API 키가 설정되지 않았습니다.\n환경 변수 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 설정해주세요.';
        } else if (loadError.message?.includes('ApiProjectMapError') || loadError.message?.includes('RefererNotAllowedMapError')) {
            errorMessage = 'Google Maps API 키 설정에 문제가 있습니다.\nAPI 키가 활성화되었는지, HTTP referrer 제한이 올바른지 확인해주세요.';
        } else if (loadError.message?.includes('InvalidKeyMapError')) {
            errorMessage = 'Google Maps API 키가 유효하지 않습니다.\n올바른 API 키를 설정해주세요.';
        }
        
        return (
            <S.MapWrapper>
                <S.ErrorMessage>
                    <S.ErrorTitle>지도 로드 오류</S.ErrorTitle>
                    <S.ErrorText>{errorMessage}</S.ErrorText>
                    {!apiKey && (
                        <S.ErrorHint>
                            .env.local 파일에 다음을 추가하세요:<br />
                            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
                        </S.ErrorHint>
                    )}
                </S.ErrorMessage>
            </S.MapWrapper>
        );
    }

    if (!isLoaded) {
        return (
            <S.MapWrapper>
                <S.LoadingOverlay>
                    <S.LoadingText>지도를 불러오는 중...</S.LoadingText>
                </S.LoadingOverlay>
            </S.MapWrapper>
        );
    }

    const coursesToDisplay = selectedCourse ? [selectedCourse] : courses;

    return (
        <S.MapWrapper>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={mapZoom}
                onLoad={onLoad}
                options={mapOptions}
            >
                {coursesToDisplay.map((course, courseIndex) => {
                    const color = course.color || '#7B61FF';
                    const isSelected = selectedCourse?.courseId === course.courseId;

                    // paths 배열을 직접 사용
                    const paths = course.paths || [];
                    
                    // 경로 포인트 배열 생성 (paths 배열을 그대로 사용)
                    const pathPoints: Array<{ lat: number; lng: number; type: 'start' | 'path' | 'end'; index?: number; point?: any }> = paths.map((point, idx) => {
                        if (idx === 0) {
                            return { lat: point.lat, lng: point.lng, type: 'start' as const, index: idx, point };
                        } else if (idx === paths.length - 1) {
                            return { lat: point.lat, lng: point.lng, type: 'end' as const, index: idx, point };
                        } else {
                            return { lat: point.lat, lng: point.lng, type: 'path' as const, index: idx, point };
                        }
                    });

                    return (
                        <div key={course.courseId || courseIndex}>
                            {/* 모든 경로 포인트에 마커 표시 */}
                            {pathPoints.map((pathPoint, pointIdx) => {
                                let label = '';
                                let infoContent = null;
                                let position = { lat: pathPoint.lat, lng: pathPoint.lng };

                                // 모든 포인트에 순서 번호 표시 (1부터 시작)
                                const pointNumber = (pathPoint.index !== undefined ? pathPoint.index : 0) + 1;
                                
                                if (pathPoint.type === 'start') {
                                    label = '1';
                                    infoContent = (
                                        <div style={{ padding: '8px', minWidth: '200px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#212121' }}>
                                                1. {pathPoint.point?.name || '시작점'}
                                            </div>
                                            {pathPoint.point?.description && (
                                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                                    {pathPoint.point.description}
                                                </div>
                                            )}
                                            <div style={{ fontSize: '14px', color: '#666' }}>
                                                {course.name}
                                            </div>
                                        </div>
                                    );
                                } else if (pathPoint.type === 'end') {
                                    label = paths.length.toString();
                                    infoContent = (
                                        <div style={{ padding: '8px', minWidth: '200px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#212121' }}>
                                                {course.paths.length}. {pathPoint.point?.name || '도착점'}
                                            </div>
                                            {pathPoint.point?.description && (
                                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                                    {pathPoint.point.description}
                                                </div>
                                            )}
                                            <div style={{ fontSize: '14px', color: '#666' }}>
                                                {course.name}
                                            </div>
                                        </div>
                                    );
                                } else if (pathPoint.type === 'path' && pathPoint.point) {
                                    const point = pathPoint.point;
                                    label = pointNumber.toString();
                                    infoContent = (
                                        <div style={{ padding: '8px', minWidth: '250px', maxWidth: '300px' }}>
                                            {point.image && (
                                                <img 
                                                    src={point.image} 
                                                    alt={point.name || `경유지 ${pointNumber}`}
                                                    style={{ 
                                                        width: '100%', 
                                                        height: '150px', 
                                                        objectFit: 'cover', 
                                                        borderRadius: '8px',
                                                        marginBottom: '8px'
                                                    }}
                                                />
                                            )}
                                            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#212121' }}>
                                                {pointNumber}. {point.name || `경유지 ${pointNumber}`}
                                            </div>
                                            {point.description && (
                                                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                                                    {point.description}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                const isActive = activeInfoWindow?.courseId === course.courseId && 
                                    ((pathPoint.type === 'start' && activeInfoWindow.pointIndex === 'start') ||
                                     (pathPoint.type === 'end' && activeInfoWindow.pointIndex === 'end') ||
                                     (pathPoint.type === 'path' && activeInfoWindow.pointIndex === pathPoint.index));

                                const markerIcon = createMarkerIcon(
                                    label, 
                                    color, 
                                    pathPoint.type,
                                    pathPoint.type === 'path' && pathPoint.point?.image ? pathPoint.point.image : undefined
                                );

                                // 모든 포인트에 장소명과 사진 표시 (name이 있는 경우만)
                                const showPlaceInfo = pathPoint.point && pathPoint.point.name;
                                const placeName = showPlaceInfo ? pathPoint.point.name : '';
                                const placeImage = showPlaceInfo && pathPoint.point ? pathPoint.point.image : null;

                                return (
                                    <div key={`${course.courseId}-${pointIdx}`}>
                                        <Marker
                                            position={position}
                                            icon={markerIcon}
                                            onClick={() => {
                                                setActiveInfoWindow({
                                                    courseId: course.courseId,
                                                    pointIndex: pathPoint.type === 'start' ? 'start' : 
                                                               pathPoint.type === 'end' ? 'end' : 
                                                               pathPoint.index!
                                                });
                                                if (onCourseSelect) {
                                                    onCourseSelect(course);
                                                }
                                            }}
                                        />
                                        
                                        {/* 마커 옆에 장소 정보 표시 (모든 포인트, name이 있는 경우) */}
                                        {showPlaceInfo && (
                                            <OverlayViewF
                                                position={position}
                                                mapPaneName="overlayMouseTarget"
                                                getPixelPositionOffset={(width, height) => ({
                                                    x: width / 2 + 15, // 마커 오른쪽으로 이동 (거리 줄임)
                                                    y: -(height / 2) - 5, // 마커 중앙에 맞춤 (거리 줄임)
                                                })}
                                            >
                                                <S.MarkerInfoContainer>
                                                    {/* 상단: 사진 */}
                                                    {placeImage && (
                                                        <S.MarkerImageContainer>
                                                            <S.MarkerImage src={placeImage} alt={placeName} />
                                                        </S.MarkerImageContainer>
                                                    )}
                                                    {/* 하단: 장소명 */}
                                                    <S.MarkerNameLabel>{placeName}</S.MarkerNameLabel>
                                                </S.MarkerInfoContainer>
                                            </OverlayViewF>
                                        )}
                                        
                                        {isActive && infoContent && (
                                            <InfoWindow
                                                position={position}
                                                onCloseClick={() => setActiveInfoWindow(null)}
                                            >
                                                {infoContent}
                                            </InfoWindow>
                                        )}
                                    </div>
                                );
                            })}

                            {/* 경로 폴리라인 (시작점-경유지들-도착점 연결) */}
                            <Polyline
                                path={pathPoints.map(p => ({ lat: p.lat, lng: p.lng }))}
                                options={{
                                    strokeColor: color,
                                    strokeOpacity: isSelected ? 1.0 : 0.6,
                                    strokeWeight: isSelected ? 5 : 3,
                                }}
                            />
                        </div>
                    );
                })}
            </GoogleMap>
        </S.MapWrapper>
    );
}