import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "../models/User";
import { db } from "../db/rotue";
const User = db.collection("users");
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    console.log(requestBody);

    // desctrctuing usuable values from the request body
    const { name, email, password } = requestBody;

    // Check if the email is alreay in use
    const emailExists = await User?.findOne({ email });

    // if email is already in use, the throw an error...
    if (emailExists) {
      return NextResponse.json(
        {
          message: "Email already in use...",
        },
        {
          status: 500,
        }
      );
    }

    // else Hash the Password and save the user
    const salt = await bcryptjs?.genSalt(10);
    const hashedPassword = await bcryptjs?.hash(password, salt);

    const newUser = User?.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User Created Successfully...",
        received_data: newUser,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    const errMsg = err as Error;
    return NextResponse.json({
      message: errMsg?.message as string,
    });
  }
}
