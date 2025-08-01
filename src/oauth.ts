import {AuthOptions, getServerSession} from "next-auth";
import {JWT} from "next-auth/jwt";

export const refreshAccessToken = async (token:JWT) => {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ECO_URL}/o/token/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_ECO_CLIENT_ID ?? "",
                client_secret: process.env.NEXT_PUBLIC_ECO_SECRET ?? "",
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token ?? ""
            })
        })

        if (!request.ok) {
            console.error(`Error re-fetching tokens: ${await request.text()}`)
        } else {
            const response = await request.json()
            const today = new Date()
            today.setSeconds(response.expires_in || 3600)
            return {...token, ...response, expires_at: today.getTime() / 1000}
        }
    } catch (error) {
        console.error(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}


const authOptions: AuthOptions = {
    debug: !!process.env.NEXTAUTH_DEBUG,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        // signOut: '/auth/sign-out',
    },
    providers: [
        {
            id: 'django',
            name: (process.env.NEXTAUTH_PROVIDER_NAME || 'OpenID') as string,
            type: "oauth",
            wellKnown: `${process.env.NEXT_PUBLIC_SERVER_ECO_URL}/o/.well-known/openid-configuration/`,
            authorization: {
                params: {
                    // url: `${process.env.NEXT_PUBLIC_SERVER_ECO_URL}/o/authorize/`,
                    scope: "openid profile email permissions read write",
                    grant_type: "authorization_code",
                }
            },
            token: {
                url: `${process.env.NEXT_PUBLIC_SERVER_ECO_URL}/o/token/`,
                params: {
                    grant_type: "authorization_code",
                },
            },
            idToken: true,
            checks: ["pkce"],
            clientId: process.env.NEXT_PUBLIC_ECO_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_ECO_SECRET,
            httpOptions: {
                timeout: 3000 * 4, // 12 seg
            },
            profile: (profile) => ({
                ...profile,
                id: profile.sub,
            }),
        }
    ],
    callbacks:{
        jwt: async ({token, user, account}) => {
            if (!!(account && user)) return {...account, user}

            if ((new Date().getTime() / 1000) < (token?.expires_at ?? 0)) return token

            return refreshAccessToken(token)
        },
        signIn: async () => {
            return true;
        },
        session:({session, token}) => {
            console.error("token", token);
            return {
                ...session,
                user: {
                    ...token,
                    is_staff:token.user?.is_staff
                }
            }
        }

    },
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }