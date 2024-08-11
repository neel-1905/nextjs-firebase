import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  //   const payload = req.body;
  const token = req.headers.get("Authorization");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 401 });
  }

  // If the token is present, proceed with the request
  return NextResponse.json({ message: "Welcome, user!" });
}
