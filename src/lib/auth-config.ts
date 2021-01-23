import { Auth0ProviderOptions } from "@auth0/auth0-react";

export const options: Auth0ProviderOptions = {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE || "openid profile",
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/",
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI || "http://localhost:3000/",
    session: {
        cookieSecret: process.env.SESSION_COOKIE_SECRET,
        cookieLifetime: Number(process.env.SESSION_COOKIE_LIFETIME) || 7200,
    },
};
