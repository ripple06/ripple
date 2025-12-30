import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Signup API is working" });
}

export async function POST(request: Request) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    if (!backendUrl) {
        console.error("[Signup API] NEXT_PUBLIC_BACKEND_URL is not defined");
        return NextResponse.json(
            { error: "Backend URL is not defined" },
            { status: 500 }
        );
    }

    try {
        const body = await request.json().catch(() => null);
        
        if (!body) {
            return NextResponse.json(
                { error: "Request body is required" },
                { status: 400 }
            );
        }

        const cleanBackendUrl = backendUrl.replace(/\/+$/, '');
        let endpoint = `${cleanBackendUrl}/api/signup`;
        console.log(`[Signup API] POST ${endpoint}`, body);

        let response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status === 404) {
            endpoint = `${cleanBackendUrl}/api/signup`;
            console.log(`[Signup API] Retrying POST ${endpoint}`, body);
            response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        }

        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log(`[Signup API] Response status: ${response.status}`, JSON.stringify(data, null, 2));
            
            // If backend returns 404, provide more helpful error
            if (response.status === 404) {
                return NextResponse.json(
                    { 
                        error: "Signup endpoint not found on backend",
                        detail: `Backend returned 404 for ${endpoint}. Please check if the endpoint exists.`,
                        attemptedUrl: endpoint
                    },
                    { status: 404 }
                );
            }
            
            // Return the full response data so frontend can inspect it
            return NextResponse.json(data, { status: response.status });
        } else {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }
    } catch (error: any) {
        console.error(`[Signup API] Error:`, error);
        return NextResponse.json(
            { 
                error: "Failed to connect to backend",
                detail: error.message 
            },
            { status: 500 }
        );
    }
}

