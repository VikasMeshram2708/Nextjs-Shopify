import { NextRequest, NextResponse } from "next/server";
import { db } from "../db/rotue";
const User = db.collection("users");
import bcryptjs from "bcryptjs";
import { UserSchema } from "../models/User";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Validate the request body against the schema
    await UserSchema.validateAsync(requestBody, { abortEarly: false });

    console.log(requestBody);

    // desctrctuing usuable values from the request body
    const { name, email, password } = requestBody;

    // Check if the email is alreay in use
    const emailExists = await User.findOne({ email });

    // if email is already in use, the throw an error...
    if (emailExists) {
      return NextResponse.json(
        {
          message: "Email already in use...",
        },
        {
          status: 400,
        }
      );
    }

    // else Hash the Password and save the user
    const salt = await bcryptjs?.genSalt(10);
    const hashedPassword = await bcryptjs?.hash(password, salt);

    const newUser = await User?.insertOne({
      name,
      email,
      password: hashedPassword,
      created_at: new Date().toLocaleDateString(),
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
    console.log(errMsg?.message);
    return NextResponse.json(
      {
        message: errMsg?.message as string,
      },
      {
        status: 500,
      }
    );
  }
}
