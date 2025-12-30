"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { REGION_DATA } from "@/constants/regionData";
import * as S from "./style";

interface DetailProps {
    params: { id: string };
}

export default function ResultDetail({ params }: DetailProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const region = searchParams.get('region') || '사하구';
    const data = (REGION_DATA[region] || REGION_DATA['사하구']).detail;

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="back" width={26} height={40} />
                    </S.BackButton>
                </S.Header>

                <S.Content>
                    <S.Title>
                        <span>{data.highlight}</span>{data.title}
                    </S.Title>

                    <S.ImageWrapper>
                        <Image src={data.image} alt={data.highlight} width={400} height={300} />
                    </S.ImageWrapper>

                    <S.InfoContainer>
                        <S.InfoItem>
                            🐠 대표 생물: {data.marineLife}
                        </S.InfoItem>
                        <S.InfoItem>
                            🌡️ 평균 수온: {data.climate}
                        </S.InfoItem>
                    </S.InfoContainer>

                    <S.Description>
                        {data.description}
                    </S.Description>

                    <S.LinkButton onClick={() => window.open(data.searchUrl, '_blank')}>
                        자세히 알아보기 (Naver 검색) <Image src="/arrow.svg" alt="arrow" width={8} height={12} style={{ transform: 'rotate(180deg)' }} />
                    </S.LinkButton>
                </S.Content>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
