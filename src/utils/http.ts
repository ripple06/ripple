// HTTP utility functions for cleaner API calls

interface RequestOptions {
    headers?: Record<string, string>;
    body?: any;
}

async function get<T>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error(`GET ${endpoint} failed: ${res.statusText}`);
    }
    return res.json();
}

async function post<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
        throw new Error(`POST ${endpoint} failed: ${res.statusText}`);
    }
    return res.json();
}

async function put<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
        throw new Error(`PUT ${endpoint} failed: ${res.statusText}`);
    }
    return res.json();
}

async function del<T>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint, {
        method: "DELETE"
    });
    if (!res.ok) {
        throw new Error(`DELETE ${endpoint} failed: ${res.statusText}`);
    }
    return res.json();
}

export const http = {
    get,
    post,
    put,
    delete: del
};
