import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { access_token, refresh_token } = await request.json()

  const cookieStore = await cookies()

  cookieStore.set('sb-access-token', access_token, {
    httpOnly: true,     
    secure: true,     
    sameSite: 'lax',
    path: '/',        
    maxAge: 60 * 60 * 24 * 7, 
  })

  cookieStore.set('sb-refresh-token', refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ success: true })
}
