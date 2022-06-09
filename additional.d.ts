declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GRAPHCMS_ENDPOINT: string;

            GRAPHCMS_TOKEN: string;

            JWT_SECRET: string;

            JWT_EXPIRES_IN: string;

            COOKIE_NAME: string;

            COOKIE_PASSWORD: string;

            API_SERVER_URL: string;
        }
    }
}

export {};
