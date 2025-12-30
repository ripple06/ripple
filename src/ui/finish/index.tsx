"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import * as S from "./style";

export default function QuizFinish() {
    const router = useRouter();

    return (
        <S.Layout>
            <S.Container>
                <S.Header>
                    <S.BackButton onClick={() => router.back()}>
                        <Image src="/arrow.svg" alt="back" width={26} height={40} />
                    </S.BackButton>
                    <S.ProgressBar>
                        <S.ProgressFill />
                    </S.ProgressBar>
                </S.Header>
                <S.Content>
                    <S.Title>
                        퀴즈를 전부 푸셨습니다. {'\n'} 축하합니다!
                    </S.Title>
                    <S.GraphicWrapper>
                        <Image src="/crow.svg" alt="crown" width={224} height={170} />
                    </S.GraphicWrapper>
                </S.Content>

                <S.ButtonGroup>
                    <S.HomeButton onClick={() => router.push("/main")}>
                        홈으로
                    </S.HomeButton>
                    <S.RetryButton onClick={() => router.push("/quizPlay")}>
                        다시 풀기
                    </S.RetryButton>
                </S.ButtonGroup>

                <BottomNav />
            </S.Container>
        </S.Layout>
    );
}
