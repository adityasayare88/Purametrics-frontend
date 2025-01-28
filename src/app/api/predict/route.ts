import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch('https://water-quality-test-wmju.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.text()
    
    return NextResponse.json({ message: data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}