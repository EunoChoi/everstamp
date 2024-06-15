import { NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest, { params }: { params: { p: string } }) {
  // Do whatever you want
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  return NextResponse.json({ params, query }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: Request) {



  // Do whatever you want
  return NextResponse.json({ message: request }, { status: 200 });
}
