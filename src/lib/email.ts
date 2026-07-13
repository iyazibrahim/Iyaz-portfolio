import nodemailer from 'nodemailer'

type ContactEmailInput = {
  name: string
  company?: string
  email: string
  roleOpportunity?: string
  message: string
}

export async function sendContactNotification(input: ContactEmailInput) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user
  const to = process.env.CONTACT_NOTIFY_EMAIL || 'iyazbrhm@gmail.com'

  if (!host || !user || !pass || !from) {
    console.warn('SMTP not configured; skipping contact email notification.')
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const lines = [
    `Name: ${input.name}`,
    `Company: ${input.company || '—'}`,
    `Email: ${input.email}`,
    `Role / opportunity: ${input.roleOpportunity || '—'}`,
    '',
    input.message,
  ]

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email,
    subject: `Resume site inquiry from ${input.name}`,
    text: lines.join('\n'),
  })
}
