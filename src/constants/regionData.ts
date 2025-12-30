export interface Course {
    id: string;
    name: string;
    description: string;
    align: 'left' | 'right';
    top: number;
    image: string;
    searchUrl: string;
    lat: number;
    lng: number;
}

export interface RegionDetail {
    marineLife: string;
    climate: string;
    description: string;
    highlight: string;
    title: string;
    image: string;
    searchUrl: string;
}

export interface RegionData {
    courses: Course[];
    detail: RegionDetail;
}

export const REGION_DATA: Record<string, RegionData> = {
    "사하구": {
        courses: [
            {
                id: "saha-1",
                name: "을숙도 철새 공원",
                description: "철새와 함께하는 생태 여행",
                align: 'left',
                top: 0,
                image: "https://images.unsplash.com/photo-1549608276-5786777e6587?q=80&w=800&auto=format&fit=crop",
                searchUrl: "https://search.naver.com/search.naver?query=을숙도+철새+공원",
                lat: 35.0886,
                lng: 128.9664
            },
            {
                id: "saha-2",
                name: "다대포 해수욕장",
                description: "황홀한 일몰과 사구",
                align: 'right',
                top: 94,
                image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Dadaepo_Beach_1.jpg",
                searchUrl: "https://search.naver.com/search.naver?query=다대포+해수욕장",
                lat: 35.04638,
                lng: 128.96860
            },
            {
                id: "saha-3",
                name: "아미산 전망대",
                description: "낙동강 하구의 전경",
                align: 'left',
                top: 256,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFP_6RemPrtTdiRvj35YIn1XZ8XyMA_DcdVw&s",
                searchUrl: "https://search.naver.com/search.naver?query=아미산+전망대",
                lat: 35.05052,
                lng: 128.97172
            },
            {
                id: "saha-4",
                name: "장림포구",
                description: "부산의 베네치아",
                align: 'right',
                top: 340,
                image: "https://i.namu.wiki/i/9JXTXXFMKxY2U-3-WMCqfpu80u25ufZK_Xhd2NAXvVznQ8PCskLh258Upn1c_DOABL473zMx25U3HcSqgo-4uw.webp",
                searchUrl: "https://search.naver.com/search.naver?query=장림포구",
                lat: 35.0747,
                lng: 128.9678
            },
        ],
        detail: {
            marineLife: "고니 (큰고니)",
            climate: "평균 13.0°C",
            highlight: "사하구",
            title: "의 겨울 손님,\n고니",
            description: "낙동강 하구 을숙도는 천연기념물 제179호로 지정된 철새 도래지입니다. 매년 겨울이면 사하구의 상징인 고니를 비롯해 다양한 철새들이 찾아와 장관을 이룹니다. 기수역의 풍부한 먹이와 따뜻한 환경 덕분에 철새들의 낙원이 되었습니다.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9XamArlM5yJT59XzvLOcrtEnJmEL6XJ6c4w&s",
            searchUrl: "https://search.naver.com/search.naver?query=사하구+고니"
        }
    },
    "영도구": {
        courses: [
            {
                id: "yeongdo-1",
                name: "흰여울문화마을",
                description: "바다 앞 절벽 마을",
                align: 'left',
                top: 0,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZX_X1T202CtR4YdHFIp_Qnvhs_gEiKpAIQ&s",
                searchUrl: "https://search.naver.com/search.naver?query=흰여울문화마을",
                lat: 35.0772,
                lng: 129.0667
            },
            {
                id: "yeongdo-2",
                name: "태종대",
                description: "기암괴석과 해안 절경",
                align: 'right',
                top: 94,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7KqpYGxUAC7mm7_dkdRi6ez_i8LH-FMr_A&s",
                searchUrl: "https://search.naver.com/search.naver?query=태종대",
                lat: 35.05361,
                lng: 129.08583
            },
            {
                id: "yeongdo-3",
                name: "국립해양박물관",
                description: "해양의 모든 것",
                align: 'left',
                top: 256,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSp0V3L5zY-isCKZwgksHt49xzJOgUsh1r5Q&s",
                searchUrl: "https://search.naver.com/search.naver?query=국립해양박물관",
                lat: 35.0787,
                lng: 129.0800
            },
            {
                id: "yeongdo-4",
                name: "감지해변",
                description: "조약돌 해변의 낭만",
                align: 'right',
                top: 340,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
                searchUrl: "https://search.naver.com/search.naver?query=감지해변",
                lat: 35.0601, // Approximate near Taejongdae
                lng: 129.0820
            },
        ],
        detail: {
            marineLife: "해달 (영도롱이)",
            climate: "평균 14.3°C",
            highlight: "영도구",
            title: "의 귀여운 이웃,\n해달",
            description: "영도구 앞바다는 해류가 강하고 수심이 깊어 다양한 해양 생물들이 서식합니다. 최근 깨끗해진 수질 덕분에 귀여운 해달과 같은 해양 포유류들도 관심을 받고 있으며, 영도의 캐릭터 '영도롱이'의 모티브가 되기도 했습니다.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSumcipCb_SQ60xEnWeHhd_xUA4dLgeEI9h0Q&s",
            searchUrl: "https://search.naver.com/search.naver?query=영도구+해달"
        }
    },
    "기장군": {
        courses: [
            {
                id: "gijang-1",
                name: "해동용궁사",
                description: "바다 위 수상 법당",
                align: 'left',
                top: 0,
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/%ED%95%B4%EB%8F%99%EC%9A%A9%EA%B6%81%EC%82%AC_%EC%82%AC%EC%B0%B0_%EC%A0%84%EA%B2%BD.jpg",
                searchUrl: "https://search.naver.com/search.naver?query=해동용궁사",
                lat: 35.18835,
                lng: 129.22332
            },
            {
                id: "gijang-2",
                name: "아홉산숲",
                description: "대나무 숲의 정취",
                align: 'right',
                top: 94,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLxgWDxXUqFlNnptbHLsfiiSTYxRJBHj_Whw&s",
                searchUrl: "https://search.naver.com/search.naver?query=아홉산숲",
                lat: 35.32437,
                lng: 129.17386
            },
            {
                id: "gijang-3",
                name: "오시리아 산책로",
                description: "해안 절경 산책",
                align: 'left',
                top: 256,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkw7or_PUF9idf_6IG3f8vsEGhSdXk2rLvg&s",
                searchUrl: "https://search.naver.com/search.naver?query=오시리아+산책로",
                lat: 35.19631,
                lng: 129.20836
            },
            {
                id: "gijang-4",
                name: "죽성성당",
                description: "그림 같은 드라마 촬영지",
                align: 'right',
                top: 340,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEyCd2BIpreYH-DdFXahZ7je7tLTOm9GW78A&s",
                searchUrl: "https://search.naver.com/search.naver?query=죽성성당",
                lat: 35.24122,
                lng: 129.24789
            },
        ],
        detail: {
            marineLife: "멸치 & 다시마",
            climate: "평균 15.7°C",
            highlight: "기장군",
            title: "의 바다 보물,\n멸치 떼",
            description: "기장 앞바다는 난류와 한류가 교차하여 플랑크톤이 풍부합니다. 이로 인해 전국적으로 유명한 기장 멸치와 다시마가 많이 생산됩니다. 봄철 멸치축제는 기장의 대표적인 행사이며, 바다의 생명력을 느낄 수 있습니다.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavy92NyODxptGgMYy9sqZ08jsWX86nGlDYw&s",
            searchUrl: "https://search.naver.com/search.naver?query=기장군+멸치"
        }
    },
    "남구": {
        courses: [
            {
                id: "namgu-1",
                name: "오륙도 스카이워크",
                description: "바다 위를 걷는 기분",
                align: 'left',
                top: 0,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAbArvzp4nl9YjU_2v9B9d_LKwffs5cNFhA&s",
                searchUrl: "https://search.naver.com/search.naver?query=오륙도+스카이워크",
                lat: 35.09194,
                lng: 129.12694
            },
            {
                id: "namgu-2",
                name: "이기대 해안산책로",
                description: "해안 절벽의 비경",
                align: 'right',
                top: 94,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6L8cFvABFcn0n9AenmXDITg0Zz1p5mp3Vw&s",
                searchUrl: "https://search.naver.com/search.naver?query=이기대+해안산책로",
                lat: 35.13594,
                lng: 129.12369
            },
            {
                id: "namgu-3",
                name: "유엔기념공원",
                description: "평화의 성지",
                align: 'left',
                top: 256,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI_PvA2sNPccpcg1koqYTrwXLJpyChOGkySQ&s",
                searchUrl: "https://search.naver.com/search.naver?query=유엔기념공원",
                lat: 35.12739,
                lng: 129.09606
            },
            {
                id: "namgu-4",
                name: "황령산 야경",
                description: "부산 최고의 야경",
                align: 'right',
                top: 340,
                image: "https://i.namu.wiki/i/vCi3IKsD_Ey0ZsPI2PYIVztD9JDP2SvuT73h4padGo6A26keErCUBxHM9FjnItg8u7R7QUeq5A5-my6d6c9fYA.webp",
                searchUrl: "https://search.naver.com/search.naver?query=황령산+야경",
                lat: 35.15736,
                lng: 129.08189
            },
        ],
        detail: {
            marineLife: "상괭이",
            climate: "평균 13.6°C",
            highlight: "남구",
            title: "의 미소 천사,\n상괭이",
            description: "오륙도와 이기대 앞바다는 한국의 인어라 불리는 토종 돌고래 '상괭이'가 자주 출몰하는 지역입니다. 해양보호생물인 상괭이가 살아스실 수 있을 만큼 건강한 해양 생태계를 유지하고 있습니다.",
            image: "https://i.namu.wiki/i/kSA8By_5e9GVXRG8bgjZ9Of7GdoXwbOTfK1tvVpurVt16k12uunS_pLq59533nWnc4CmtveiiZqjstG0SwhUBg.webp",
            searchUrl: "https://search.naver.com/search.naver?query=부산+상괭이"
        }
    },
    "서구": {
        courses: [
            {
                id: "seogu-1",
                name: "송도 해상케이블카",
                description: "하늘에서 본 바다",
                align: 'left',
                top: 0,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDadXWrBEKd9V6MxiUtJXl2ymC-9RG5E5DWw&s",
                searchUrl: "https://search.naver.com/search.naver?query=송도+해상케이블카",
                lat: 35.07664,
                lng: 129.02340
            },
            {
                id: "seogu-2",
                name: "송도 구름산책로",
                description: "거북섬의 전설",
                align: 'right',
                top: 94,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrO1rREOhGK8OK4xMbA70FqkSrDHp3fomMeA&s",
                searchUrl: "https://search.naver.com/search.naver?query=송도+구름산책로",
                lat: 35.07594,
                lng: 129.02157
            },
            {
                id: "seogu-3",
                name: "임시수도기념관",
                description: "피란 수도의 역사",
                align: 'left',
                top: 256,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyyao3EwU852Gs2a3-fpH2mu4D74a8WhliGQ&s",
                searchUrl: "https://search.naver.com/search.naver?query=임시수도기념관",
                lat: 35.10375,
                lng: 129.01760
            },
            {
                id: "seogu-4",
                name: "암남공원",
                description: "공룡 발자국과 숲",
                align: 'right',
                top: 340,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtlp9q2V4kotFb4ReEv8xNz1qHI2WArF6nA&s",
                searchUrl: "https://search.naver.com/search.naver?query=암남공원",
                lat: 35.0605, // Approximate location for Amnam Park
                lng: 129.0195
            },
        ],
        detail: {
            marineLife: "고등어",
            climate: "평균 14.6°C",
            highlight: "서구",
            title: "의 국민 생선,\n고등어",
            description: "부산 서구는 대한민국 고등어의 집산지입니다. 송도 앞바다와 부산공동어시장을 중심으로 고등어 축제가 열리며, 역동적인 바다의 에너지와 풍요로움을 상징합니다.",
            image: "https://i.namu.wiki/i/iVxGuwgPEmQaEOSRxAfli5CeUnH-Qfd_G4MS1KZw68I1tMtlecA6JAszCr5rtrjEw3oSfJAZPANzUWaivIXJWA.webp",
            searchUrl: "https://search.naver.com/search.naver?query=부산+서구+고등어"
        }
    }
};
