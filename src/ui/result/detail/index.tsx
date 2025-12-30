"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

interface DetailProps {
    params: { id: string };
}

const DETAIL_DATA: Record<string, { title: string; highlight: string; description: string; image: string }> = {
    "1": {
        highlight: "영도",
        title: "로 알아보는\n해양 생태계",
        image: "https://images.unsplash.com/photo-1590603740183-980e7f6920eb?q=80&w=800&auto=format&fit=crop",
        description: "영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은 영도에 흰여울문화마을은"
    },
};

export default function ResultDetail({ params }: DetailProps) {
    const router = useRouter();
    const data = DETAIL_DATA[params.id] || DETAIL_DATA["1"];

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

                    <S.Description>
                        {data.description}
                    </S.Description>
                </S.Content>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
