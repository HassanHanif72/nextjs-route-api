import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {

    const { id } = params;

    return NextResponse.json({
        status: 'Success',
        message: {
            id: `User ID: ${id}`
        }
    })
}