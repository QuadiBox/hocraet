import { NextResponse } from 'next/server';

export async function GET(req) {
  const apiKey = '75782b2e0c90b3'; // ipinfo.io API key
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1'; // Default to localhost IP for testing
  
  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${apiKey}`);
    if (!response.ok) {
      console.log('error while trying to fetch you data');
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('data fetched succesfully', data);
    return NextResponse.json({...data});
  } catch (error) {
    console.error('error bad request', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
