import { SessionService } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const user = await SessionService.getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated. User not found or session expired." },
        { status: 401 }
      );
    }

    // Remove sensitive data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;

    return NextResponse.json({
      user: safeUser,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
