import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, roleOpportunity, message, website } = body

    if (website) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        company: company || '',
        email,
        roleOpportunity: roleOpportunity || '',
        message,
      },
    })

    await sendContactNotification({
      name,
      company,
      email,
      roleOpportunity,
      message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 500 })
  }
}
