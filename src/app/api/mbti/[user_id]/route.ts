import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { user_id: string } | Promise<{ user_id: string }> }
) {
    try {
        const resolvedParams = params instanceof Promise ? await params : params;
        const userId = resolvedParams.user_id;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error("[MBTI API] NEXT_PUBLIC_BACKEND_URL is not defined");
            return NextResponse.json(
                { error: "Backend URL is not defined" },
                { status: 500 }
            );
        }

        const cleanBackendUrl = backendUrl.replace(/\/+$/, '');
        const endpoint = `${cleanBackendUrl}/mbti/${userId}`;
        console.log(`[MBTI API] GET ${endpoint}`);

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log(`[MBTI API] Response status: ${response.status}`, JSON.stringify(data, null, 2));
            return NextResponse.json(data, { status: response.status });
        } else {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }
    } catch (error: any) {
        console.error(`[MBTI API] Error:`, error);
        return NextResponse.json(
            {
                error: "Failed to connect to backend",
                detail: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: { user_id: string } | Promise<{ user_id: string }> }
) {
    try {
        const resolvedParams = params instanceof Promise ? await params : params;
        const userId = resolvedParams.user_id;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error("[MBTI API] NEXT_PUBLIC_BACKEND_URL is not defined");
            return NextResponse.json(
                { error: "Backend URL is not defined" },
                { status: 500 }
            );
        }

        const body = await request.json().catch(() => null);
        
        if (!body || !body.mbti) {
            return NextResponse.json(
                { error: "MBTI is required in request body" },
                { status: 400 }
            );
        }
        const endpoint = `/api/mbti/${userId}`;
        console.log(`[MBTI API] POST ${endpoint}`, body);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log(`[MBTI API] Response status: ${response.status}`, JSON.stringify(data, null, 2));
            return NextResponse.json(data, { status: response.status });
        } else {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }
    } catch (error: any) {
        console.error(`[MBTI API] Error:`, error);
        return NextResponse.json(
            {
                error: "Failed to connect to backend",
                detail: error.message
            },
            { status: 500 }
        );
    }
}

