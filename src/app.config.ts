import { Capacitor } from "@capacitor/core";

const isMobile = Capacitor.isNativePlatform();
const isProduction = process.env.NODE_ENV === 'production';
const isIOS = isMobile && Capacitor.getPlatform() === 'ios';

const appConfig = {
    isMobile: isMobile,
    isProduction: isProduction,
    isDevelopment: !isProduction,
    isIOS: isIOS,
    isWeb: !isMobile,
    isAndroid: Capacitor.getPlatform() === 'android',
    auth: {
        authUrl: 'https://oauth2.it.auth.gr/auth',
        userInfoUrl: 'https://universis-api.it.auth.gr/api/students/me/grades?$filter=courseExam/year%20eq%202002',
        logoutUrl: 'https://oauth2.it.auth.gr/auth/realms/universis/protocol/openid-connect/logout',
        realm: 'universis',
        clientId: 'aristomate',
        redirectUri: 'https://applink.aristomate.auth.gr/authsso/callback',
        scope: 'students:read offline_access openid',
        isMobile: isMobile,
        // Use proxy for web
        tokenUrl: isMobile ? undefined : 'https://applink.aristomate.auth.gr/api/auth/token',
        isProduction: isProduction,
        isIOS: isIOS
    },
    universis: {
        api: 'https://universis-api.it.auth.gr/api'
    },
    menu: {
        apiBase: "https://api.aristomate.auth.gr/menu"
    }
}

export default appConfig;