import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("Hello From User Api")
}