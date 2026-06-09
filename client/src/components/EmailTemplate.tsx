"use client";
import { sendEmail } from "@/app/actions";
import { useState } from "react";

export default function EmailTemplate() {
  const [status, setStatus] = useState<string>("");

  async function handleFormSubmit(formData: FormData) {
    setStatus("Sending...");
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus(`Success! Email ID: ${result.id}`);
    } else {
      setStatus(`Error: ${result.error}`);
    }
  }
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Next.js + Resend Test</h1>

      <form action={handleFormSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="email"
          name="email"
          placeholder="Enter your Resend signup email"
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Send Test Email
        </button>
      </form>

      {status && (
        <p style={{ marginTop: "16px", fontWeight: "bold" }}>{status}</p>
      )}
    </div>
  );
}
