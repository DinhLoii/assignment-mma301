/**
 * HTTP Client Utility
 * Configured for REST endpoints or custom backends (Exam 2 preparation)
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const axiosClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    console.log('[axiosClient] GET', url);
    return { data: {} as T, status: 200 };
  },
  post: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    console.log('[axiosClient] POST', url, body);
    return { data: {} as T, status: 201 };
  },
  put: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    console.log('[axiosClient] PUT', url, body);
    return { data: {} as T, status: 200 };
  },
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    console.log('[axiosClient] DELETE', url);
    return { data: {} as T, status: 200 };
  },
};

export default axiosClient;
