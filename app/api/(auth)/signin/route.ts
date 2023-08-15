import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const response = await fetch(`${process.env.BACKEND}/v1/api/auth/signin`, {
            method: 'POST',
            body: formData
        })

        const data = await response.json()
        const cookies = response.headers.get('set-cookie') || '';

        return NextResponse.json(data, { headers: { 'Set-Cookie': cookies }, status: response.status });
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }
    }
}