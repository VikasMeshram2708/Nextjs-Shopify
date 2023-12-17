import { NextRequest, NextResponse } from "next/server";
import { db } from "../db/rotue";
const User = db.collection("users");
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

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
      return NextResponse.json(
        {
          message: "Email not found...",
        },
        {
          status: 500,
        }
      );
    }

    // compare the password
    const isValidPassword = await bcryptjs.compare(
      password,
      registeredUser?.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Invalid Credentials Provided...",
        },
        {
          status: 500,
        }
      );
    }

    // JWT Configuration Section
    console.log(registeredUser); // contains the user object

    const token = jwt.sign(registeredUser, process.env.NEXT_PUBLIC_JWT_TOKEN!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "User Logged in successfully...",
    });

    // setting the cookies

    response.cookies.set("token", token);

    return response;
  } catch (err) {
    const errMsg = err as Error;
    console.log(errMsg?.message);
    return NextResponse.json({
      message: errMsg?.message,
    });
  }
}
