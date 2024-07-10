import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const body = await request.json();

  const dbResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${body.userId}`,
    {
      cache: "no-store",
    }
  );
  const tempUser = await dbResponse.json();
  if (!tempUser) return NextResponse.json("User not found!", { status: 404 });

  const response = await fetch(
    `https://www.spot.im/api/sso/v1/update-user?primary_key=${tempUser.id}&user_name=${tempUser.username}&image_url=${tempUser.image_url}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
}
