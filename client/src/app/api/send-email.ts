import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
