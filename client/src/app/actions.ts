"use server";

import { dispatchEmail } from "@/lib/mailer";

export async function sendEmail(formData: FormData) {
  const userEmail = formData.get("email") as string;

  try {
    const result = await dispatchEmail({
      from: "System Admin <system@my-local-app.localhost>",
      to: [userEmail],
      subject: "Welcome to the Platform!",
      html: "<h1>Account Created Successfully</h1><p>Mailpit intercepted this locally.</p>",
    });

    return { success: true, message: `Dispatched with ID: ${result.id}` };
  } catch (err: any) {
    console.log(err.message)
    return { success: false, error: err.message };
  }
}
