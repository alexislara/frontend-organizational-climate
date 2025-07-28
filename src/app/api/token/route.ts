import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (token) return NextResponse.json({ access_token: token.access_token });

    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}