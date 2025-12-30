// Custom Axios-like utility using fetch API
// Provides axios-compatible interface without external dependencies

interface AxiosRequestConfig {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    data?: any;
    params?: Record<string, string | number | boolean>;
    baseURL?: string;
}

interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
    config: AxiosRequestConfig;
}

interface AxiosError extends Error {
    response?: AxiosResponse;
    config: AxiosRequestConfig;
    isAxiosError: boolean;
}

class CustomAxiosError extends Error implements AxiosError {
    response?: AxiosResponse;
    config: AxiosRequestConfig;
    isAxiosError: boolean = true;

    constructor(message: string, config: AxiosRequestConfig, response?: AxiosResponse) {
        super(message);
        this.name = 'CustomAxiosError';
        this.config = config;
        this.response = response;
    }
}

async function customAxios<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const {
        url = '',
        method = 'GET',
        headers = {},
        data,
        params,
        baseURL = ''
    } = config;

    // Build full URL
    let fullUrl = baseURL ? `${baseURL}${url}` : url;

    // Add query parameters
    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value));
        });
        const queryString = searchParams.toString();
        if (queryString) {
            fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
        }
    }

    // Prepare headers
    const requestHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // Prepare fetch options
    const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
    };

    // Add body for methods that support it
    if (method !== 'GET' && method !== 'HEAD' && data !== undefined) {
        fetchOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(fullUrl, fetchOptions);
        
        // Parse response
        const contentType = response.headers.get('content-type');
        let responseData: any;
        
        if (contentType && contentType.includes('application/json')) {
            try {
                responseData = await response.json();
            } catch {
                responseData = await response.text();
            }
        } else {
            responseData = await response.text();
        }

        const axiosResponse: AxiosResponse<T> = {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config,
        };

        // Throw error for non-2xx status codes
        if (!response.ok) {
            throw new CustomAxiosError(
                `Request failed with status code ${response.status}`,
                config,
                axiosResponse
            );
        }

        return axiosResponse;
    } catch (error: any) {
        if (error instanceof CustomAxiosError) {
            throw error;
        }
        throw new CustomAxiosError(
            error.message || 'Network Error',
            config
        );
    }
}

// Convenience methods
customAxios.get = <T = any>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) => {
    return customAxios<T>({ ...config, url, method: 'GET' });
};

customAxios.post = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
    return customAxios<T>({ ...config, url, method: 'POST', data });
};

customAxios.put = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
    return customAxios<T>({ ...config, url, method: 'PUT', data });
};

customAxios.delete = <T = any>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) => {
    return customAxios<T>({ ...config, url, method: 'DELETE' });
};

customAxios.patch = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
    return customAxios<T>({ ...config, url, method: 'PATCH', data });
};

// Create instance factory
customAxios.create = (defaultConfig: AxiosRequestConfig) => {
    const instance = (config: AxiosRequestConfig) => {
        return customAxios({ ...defaultConfig, ...config });
    };

    instance.get = <T = any>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) => {
        return customAxios<T>({ ...defaultConfig, ...config, url, method: 'GET' });
    };

    instance.post = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
        return customAxios<T>({ ...defaultConfig, ...config, url, method: 'POST', data });
    };

    instance.put = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
        return customAxios<T>({ ...defaultConfig, ...config, url, method: 'PUT', data });
    };

    instance.delete = <T = any>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) => {
        return customAxios<T>({ ...defaultConfig, ...config, url, method: 'DELETE' });
    };

    instance.patch = <T = any>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>) => {
        return customAxios<T>({ ...defaultConfig, ...config, url, method: 'PATCH', data });
    };

    return instance;
};

export default customAxios;
export type { AxiosRequestConfig, AxiosResponse, AxiosError };

