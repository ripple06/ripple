import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mapX = searchParams.get("mapX");
    const mapY = searchParams.get("mapY");
    const radius = searchParams.get("radius") || "2000";

    const serviceKey = process.env.NEXT_PUBLIC_TOUR_API_KEY;

    if (!serviceKey) {
        console.error("[API Proxy] Error: NEXT_PUBLIC_TOUR_API_KEY is missing in .env");
        return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    // 사용자의 제안에 따라 KorService2 사용
    const apiUrl = `https://apis.data.go.kr/B551011/KorService2/locationBasedList2`;

    // URLSearchParams는 이미 인코딩된 키를 또 인코딩할 수 있으므로 주의가 필요함
    const queryParams = new URLSearchParams({
        MobileOS: "ETC",
        MobileApp: "Ripple",
        _type: "json",
        mapX: mapX || "",
        mapY: mapY || "",
        radius: radius,
        numOfRows: "20",
        arrange: "A"
    });

    const fullUrl = `${apiUrl}?serviceKey=${serviceKey}&${queryParams.toString()}`;
    console.log(`[API Proxy] Fetching: ${fullUrl.replace(serviceKey, "***")}`);

    try {
        const response = await fetch(fullUrl);
        const data = await response.json();

        if (!response.ok || data.response?.header?.resultCode !== "0000") {
            const errorMsg = data.response?.header?.resultMsg || "Failed to fetch from Tourism API";
            console.error(`[API Proxy] External API Error: ${errorMsg}`, data);
            return NextResponse.json({
                error: errorMsg,
                details: data
            }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("[API Proxy] Internal Exception:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
