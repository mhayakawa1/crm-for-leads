import nodemailer from "nodemailer";
import { Resend } from "resend";

const isDevelopment = process.env.NODE_ENV === "development";

const localTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: parseInt(process.env.MAIL_PORT || "1025"),
  secure: false,
});

const resend = new Resend("re_Rb9kagVH_26qh6Ar1e8SFLMrTQfwJQgJG");

interface SendEmailArgs {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export async function dispatchEmail({
  from,
  to,
  subject,
  html,
}: SendEmailArgs) {
  if (isDevelopment) {
    console.log(`[Mailpit] Intercepting email to: ${to.join(", ")}`);
    const info = await localTransporter.sendMail({ from, to, subject, html });
    return { success: true, id: info.messageId };
  } else {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    return { success: true, id: data?.id };
  }
}
