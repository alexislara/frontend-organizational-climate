import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = async (request: NextRequest) => {
    const session = await getToken({ req: request })

    if (!session) {
        const requestedPage = request.nextUrl.pathname
        const url = request.nextUrl.clone()
        url.pathname = "/auth/sign-in"
        url.search = `p=${requestedPage}`

        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/auth",
        "/users/:path*",
        "/branches/:path*",
        "/evidences/:path*",
        "/action-plans/:path*",
    ]
}

export default middleware