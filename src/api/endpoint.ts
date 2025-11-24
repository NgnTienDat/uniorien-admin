// src/api/endpoints.ts
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        INTROSPECT: '/auth/introspect',
        ME: '/api/v1/users/my-info',
    },

    // Users
    USERS: {
        LIST: '/api/v1/users/',
        DETAIL: (id: string) => `/api/v1/users/${id}`,
        LOCK: (id: string) => `/api/v1/users/${id}/lock`,
        UNLOCK: (id: string) => `/api/v1/users/${id}/unlock`,
        DELETE: (id: string) => `/api/v1/users/${id}`,
    },

    // Universities
    UNIVERSITIES: {
        LIST: '/api/v1/admin/universities',
        DETAIL: (code: string) => `/api/v1/admin/universities/${code}`,
        CREATE: '/api/v1/admin/universities',
        UPDATE: (code: string) => `/api/v1/admin/universities/${code}`,
        DELETE: (code: string) => `/api/v1/admin/universities/${code}`,
        BENCHMARKS: (code: string) => `/api/v1/admin/universities/${code}/benchmarks`,
    },

    // Comments
    COMMENTS: {
        LIST: '/api/v1/admin/comments',
        DELETE: (id: string) => `/api/v1/admin/comments/${id}`,
        APPROVE: (id: string) => `/api/v1/admin/comments/${id}/approve`,
        REJECT: (id: string) => `/api/v1/admin/comments/${id}/reject`,
    },

    // News
    NEWS: {
        LIST: '/api/v1/admin/news',
        DETAIL: (id: string) => `/api/v1/admin/news/${id}`,
        CREATE: '/api/v1/admin/news',
        UPDATE: (id: string) => `/api/v1/admin/news/${id}`,
        DELETE: (id: string) => `/api/v1/admin/news/${id}`,
        PUBLISH: (id: string) => `/api/v1/admin/news/${id}/publish`,
    },

    // Scraping
    SCRAPING: {
        JOBS: '/api/v1/admin/scraping/jobs',
        START: '/api/v1/admin/scraping/start',
        STATUS: (jobId: string) => `/api/v1/admin/scraping/jobs/${jobId}`,
        VERIFY: '/api/v1/admin/scraping/verify',
        FINALIZE: '/api/v1/admin/scraping/finalize',
    },

    // Majors
    MAJORS: {
        LIST: '/api/v1/admin/majors',
        DETAIL: (id: string) => `/api/v1/admin/majors/${id}`,
        CREATE: '/api/v1/admin/majors',
        UPDATE: (id: string) => `/api/v1/admin/majors/${id}`,
        DELETE: (id: string) => `/api/v1/admin/majors/${id}`,
    },

    // Major Groups
    MAJOR_GROUPS: {
        LIST: '/api/v1/admin/major-groups',
        DETAIL: (id: string) => `/api/v1/admin/major-groups/${id}`,
        CREATE: '/api/v1/admin/major-groups',
        UPDATE: (id: string) => `/api/v1/admin/major-groups/${id}`,
        DELETE: (id: string) => `/api/v1/admin/major-groups/${id}`,
    },
};