import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  console.log(req);
  const session = await auth();
  console.log(session);

  if (session) {
    return Response.json({ session });
  }

  return Response.json(false);
}