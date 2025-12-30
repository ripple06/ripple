"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { REGION_DATA } from "@/constants/regionData";
import * as S from "./style";

export default function Result() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const region = searchParams.get('region') || '사하구';
    const regionData = REGION_DATA[region] || REGION_DATA['사하구'];
    const courseItems = regionData.courses;

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="arrow" width={26} height={40} />
                    </S.BackButton>
                </S.Header>
                <S.Title>
                    오늘의 여행 코스를{"\n"}소개합니다.
                </S.Title>
                <S.Subtitle>클릭 시 해당 지역의 생태계를 볼 수 있어요</S.Subtitle>
                <S.CourseList>
                    <S.ZigzagCanvas>
                        <Image src="/line.svg" alt="line" width={350} height={350} />
                    </S.ZigzagCanvas>
                    {courseItems.map((item) => (
                        <S.CourseItemWrapper
                            key={item.id}
                            top={item.top}
                            left={item.align === 'left' ? 24 : undefined}
                            right={item.align === 'right' ? 24 : undefined}
                            onClick={() => router.push(`/result/detail/${item.id}?region=${region}`)}
                        >
                            <S.CourseCard>
                                <S.CourseImage>
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                </S.CourseImage>
                                <S.CourseName>{item.name}</S.CourseName>
                            </S.CourseCard>
                        </S.CourseItemWrapper>
                    ))}
                </S.CourseList>
                <S.FloatingMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Image src="/more.svg" alt="more" width={24} height={24} />
                </S.FloatingMenuButton>
                {isMenuOpen && (
                    <S.TopLeftGroup>
                        <S.FloatingButton onClick={() => router.push("/main")}>지도로 보기</S.FloatingButton>
                        <S.FloatingButton onClick={() => router.push("/question")}>완료하고 글남기기</S.FloatingButton>
                    </S.TopLeftGroup>
                )}
                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
