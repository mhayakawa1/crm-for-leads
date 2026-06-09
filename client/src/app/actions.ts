"use server";
import { Resend } from "resend";

const resend = new Resend('re_Rb9kagVH_26qh6Ar1e8SFLMrTQfwJQgJG')
export async function sendEmail(formData: FormData) {
  const targetEmail = formData.get("email") as string;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [targetEmail],
      subject: "Hello from Next.js!",
      html: "<p>This email was triggered from localhost using a Server Action.</p>",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    return { success: false, error: "Failed to dispatch email" };
  }
}
