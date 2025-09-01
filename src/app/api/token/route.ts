import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    // Validaciones de seguridad
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verificar que el token no haya expirado
    if (token.expires_at && Date.now() / 1000 > token.expires_at) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Verificar que existe el access_token
    if (!token.access_token) {
      return NextResponse.json(
        { error: "No access token available" },
        { status: 401 },
      );
    }

    // Solo devolver el access_token, no todo el objeto token
    return NextResponse.json({
      access_token: token.access_token,
      expires_at: token.expires_at,
    });
  } catch (error) {
    console.error(
      "Token validation error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "Token validation failed" },
      { status: 500 },
    );
  }
}
