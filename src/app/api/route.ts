import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("Hello From The API Route")
}