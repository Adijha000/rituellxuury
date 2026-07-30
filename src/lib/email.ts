import { Resend } from "resend";

const FROM = process.env.WAITLIST_FROM_EMAIL || "Rituel <onboarding@resend.dev>";
const NOTIFY_TO = process.env.WAITLIST_NOTIFY_EMAIL || "rituelluxury@gmail.com";

function confirmationHtml(firstName: string) {
  return `
  <div style="background:#f4ede2;padding:48px 24px;font-family:Georgia,serif;color:#1d1d1b;">
    <div style="max-width:520px;margin:0 auto;background:#efe7da;border-radius:4px;padding:48px 40px;text-align:center;">
      <p style="letter-spacing:0.35em;font-size:12px;color:#16332b;text-transform:uppercase;margin:0 0 32px;">Rituel</p>
      <h1 style="font-size:28px;font-weight:400;margin:0 0 16px;color:#16332b;">You're officially one of the first, ${firstName}.</h1>
      <p style="font-size:16px;line-height:1.6;color:#5a4632;margin:0 0 24px;">
        Welcome to the Founding Circle. You've reserved your place among the first 500 —
        before Rituel is introduced to the world.
      </p>
      <p style="font-size:14px;line-height:1.7;color:#5a4632;">
        Lifetime founder pricing, early access, and a few surprises are already yours.
        We'll be in touch soon with what comes next.
      </p>
      <p style="margin-top:40px;font-size:12px;letter-spacing:0.2em;color:#6b6a45;text-transform:uppercase;">
        Rituals from nature, results you feel.
      </p>
    </div>
  </div>`;
}

export async function sendConfirmationEmail(to: string, firstName: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to the Rituel Founding Circle",
    html: confirmationHtml(firstName),
  });

  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `New founding member: ${firstName}`,
    html: `<p>${firstName} (${to}) just joined the Rituel founding waitlist.</p>`,
  });

  return { skipped: false as const };
}
