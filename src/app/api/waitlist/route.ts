import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/waitlistSchema";
import { addToWaitlist, getFoundingMemberCount } from "@/lib/waitlistStore";
import { sendConfirmationEmail } from "@/lib/email";

export async function GET() {
  const { count, cap } = await getFoundingMemberCount();
  return NextResponse.json({ count, cap });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Please check your details.";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  try {
    await addToWaitlist(parsed.data);
  } catch (err) {
    console.error("Failed to save waitlist entry", err);
    return NextResponse.json(
      { error: "Something went wrong reserving your place. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendConfirmationEmail(parsed.data.email, parsed.data.firstName);
  } catch (err) {
    console.error("Failed to send confirmation email", err);
  }

  const { count, cap } = await getFoundingMemberCount();
  return NextResponse.json({ ok: true, count, cap });
}
