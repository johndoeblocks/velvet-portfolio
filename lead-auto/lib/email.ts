type AuthEmail = {
  to: string;
  subject: string;
  text: string;
};

export async function sendAuthEmail({ to, subject, text }: AuthEmail) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM ?? "Velvet Neuron Lead Auto <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.info(`[auth-email] ${subject} -> ${to}\n${text}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to, subject, text })
  });

  if (!response.ok) {
    throw new Error(`Failed to send auth email: ${response.status} ${await response.text()}`);
  }
}
