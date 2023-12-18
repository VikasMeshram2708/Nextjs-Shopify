import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const resposne = NextResponse.json({
      message: "Logout Successfully...",
    });

    resposne.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return resposne;
  } catch (error) {
    const errMsg = error as Error;
    return NextResponse.json(
      {
        message: errMsg.message,
      },
      {
        status: 500,
      }
    );
  }
}
