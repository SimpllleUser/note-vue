/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API_KEY: string
    AUTH_DOMAIN: string
    PROJECT_ID: string
    STORAGE_BUCKET: string
    MESSAGING_SENDER_ID: string
    APP_ID: string
    MEASUREMENT_ID: string
  }
}
