import { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User extends DefaultSession["user"] {
        id: string,
        email: string,
        name: string,
        picture: Blob | MediaSource ,
        permissions: string[]
        permission_name: "Alumno" | "Docente" | "Vinculacion"
        is_staff:boolean
    }

    interface Session extends DefaultSession {
        user: {
            providerAccountId:string;
            is_staff?: boolean;
            permissions?: string[];
        } & User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string;
        refresh_token?: string;
        expires_at?: number;
        user?: {
            is_staff?: boolean;
            permissions?: string[];
        };
        error?: string;
    }
}