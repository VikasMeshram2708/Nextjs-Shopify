import { NextRequest, NextResponse } from "next/server";
import { db } from "../db/rotue";
const User = db.collection("users");
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    console.log(requestBody);

    // desctrctuing usuable values from the request body
    const { email, password } = requestBody;
    console.log("em", email);

    // Check if the email is registered or not
    const registeredEmail = await User?.findOne({ email });

    NextResponse.json({
      message: registeredEmail,
    });
  } catch (err) {
    const errMsg = err as Error;
    return NextResponse.json({
      message: errMsg?.message as string,
    });
  }
}
