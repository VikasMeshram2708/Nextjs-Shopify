import { NextRequest, NextResponse } from "next/server";
import { db } from "../db/rotue";
const User = db.collection("users");
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { email, password } = requestBody;

    if (!email) {
      return NextResponse.json({
        message: "Email not provided...",
      });
    }

    if (!password) {
      return NextResponse.json({
        message: "Password not provided...",
      });
    }

    const registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      return NextResponse.json({
        message: "Email not found...",
      });
    }

    // compare the password
    const isValidPassword = await bcryptjs.compare(
      password,
      registeredUser?.password
    );

    if (!isValidPassword) {
      return NextResponse.json({
        message: "Invalid Credentials Provided...",
      });
    }

    return NextResponse.json({
      message: "User Logged in successfully...",
    });
  } catch (err) {
    const errMsg = err as Error;
    console.log(errMsg?.message);
    return NextResponse.json({
      message: errMsg?.message,
    });
  }
}
