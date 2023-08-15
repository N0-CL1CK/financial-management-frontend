import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const response = await fetch(`${process.env.BACKEND}/v1/api/auth/code?email=${email}`, { method: 'GET' })
        const data = await response.json()

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }
    }
}