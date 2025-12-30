import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { path: string[] } | Promise<{ path: string[] }> }) {
    const resolved = await params;
    return handleRequest(request, resolved?.path, "GET");
}

export async function POST(request: Request, { params }: { params: { path: string[] } | Promise<{ path: string[] }> }) {
    const resolved = await params;
    return handleRequest(request, resolved?.path, "POST");
}

export async function PUT(request: Request, { params }: { params: { path: string[] } | Promise<{ path: string[] }> }) {
    const resolved = await params;
    return handleRequest(request, resolved?.path, "PUT");
}

export async function DELETE(request: Request, { params }: { params: { path: string[] } | Promise<{ path: string[] }> }) {
    const resolved = await params;
    return handleRequest(request, resolved?.path, "DELETE");
}

async function handleRequest(request: Request, path: string[] | undefined, method: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
        return NextResponse.json({ error: "Backend URL is not defined" }, { status: 500 });
    }

    if (!path || path.length === 0) {
        return NextResponse.json({ error: "No path provided to proxy" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `${backendUrl}/${path.join("/")}${queryString ? `?${queryString}` : ""}`;

    console.log(`[Backend Proxy] ${method} ${endpoint}`);

    try {
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (method !== "GET" && method !== "HEAD") {
            const body = await request.json().catch(() => null);
            if (body) {
                fetchOptions.body = JSON.stringify(body);
            }
        }

        const response = await fetch(endpoint, fetchOptions);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        } else {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }
    } catch (error: any) {
        console.error(`[Backend Proxy] Error targeting ${endpoint}:`, error);
        return NextResponse.json({ error: "Failed to connect to backend", detail: error.message }, { status: 500 });
    }
}
