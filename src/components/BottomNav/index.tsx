"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import * as S from "./style";

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => {
        if (path === '/recommand') {
            return pathname === '/recommand' || pathname === '/result' || pathname === '/question';
        }
        if (path === '/quiz') {
            return pathname === '/quiz' || pathname === '/quizPlay';
        }
        return pathname === path;
    };

    const navItems = [
        {
            id: 'home',
            label: '홈',
            path: '/main',
            icon: '/home.svg',
            activeIcon: '/Ahome.svg',
            width: 24,
            height: 24
        },
        {
            id: 'course',
            label: '코스 추천',
            path: '/recommand',
            icon: '/recommand.svg',
            activeIcon: '/Arecommand.svg',
            width: 24,
            height: 24
        },
        {
            id: 'quiz',
            label: '퀴즈',
            path: '/quiz',
            icon: '/quiz.svg',
            activeIcon: '/Aquiz.svg',
            width: 24,
            height: 24
        },
        {
            id: 'mypage',
            label: '마이페이지',
            path: '/mypage',
            icon: '/mypage.svg',
            activeIcon: '/Amypage.svg',
            width: 24,
            height: 24
        }
    ];

    return (
        <S.BottomNavWrapper>
            {navItems.map((item) => (
                <S.NavItem
                    key={item.id}
                    active={isActive(item.path)}
                    onClick={() => router.push(item.path)}
                >
                    <S.IconWrapper>
                        <Image
                            src={isActive(item.path) ? item.activeIcon : item.icon}
                            alt={item.label}
                            width={item.width}
                            height={item.height}
                        />
                    </S.IconWrapper>
                    <span>{item.label}</span>
                </S.NavItem>
            ))}
        </S.BottomNavWrapper>
    );
}
