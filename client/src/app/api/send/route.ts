import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLocalTestEmail() {
  console.log(process.env)
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: 'Hello from Localhost',
      react: '<strong>It works perfectly on local!</strong>',
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
