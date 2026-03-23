import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("Missing RESEND_API_KEY env var");
    _resend = new Resend(key);
  }
  return _resend;
}

interface ApplicationData {
  fullName: string;
  email: string;
  college?: string;
  yearOfStudy?: string;
  teamSize?: string;
  problem: string;
  whoHasProblem?: string;
  whyNow?: string;
  whyYou: string;
  hoursPerWeek?: string;
  supportArea?: string;
  successVision?: string;
  loomLink?: string;
}

// ─── Shared email wrapper ───
function emailWrapper(content: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F6F4EF; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #F6F4EF; padding: 40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

        <!-- Banner image -->
        <tr><td style="border-radius: 4px 4px 0 0; overflow: hidden; line-height: 0;">
          <img src="https://vpadhnovreqkmeprqyep.supabase.co/storage/v1/object/public/assets/email-banner.png" alt="Arc · 01" width="600" style="width: 100%; height: auto; display: block; border-radius: 4px 4px 0 0;" />
        </td></tr>

        <!-- Content -->
        <tr><td style="background: #ffffff; padding: 40px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background: #fafaf8; padding: 24px 40px; border-radius: 0 0 4px 4px; border-top: 1px solid #eee;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size: 11px; color: #999; line-height: 1.6;">
              Arc · 01 &mdash; 0 &rarr; Pre-Seed<br>
              A 6-month program for founders building their first product.
            </td>
            <td align="right" style="font-size: 11px;">
              <a href="https://x.com/0xkrishnaa" style="color: #8B6338; text-decoration: none;">@0xkrishnaa</a>
            </td>
          </tr></table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Label row helper ───
function row(label: string, value: string, isLink = false) {
  const content = isLink
    ? `<a href="${value}" style="color: #8B6338; word-break: break-all;">${value}</a>`
    : value;
  return `
    <tr>
      <td style="padding: 10px 12px 10px 0; color: #8B6338; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; width: 130px; vertical-align: top; font-weight: 500;">${label}</td>
      <td style="padding: 10px 0; font-size: 14px; color: #333; line-height: 1.65;">${content}</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1px solid #f0efeb;"></td></tr>`;
}

// ─── Admin notification email ───
export async function sendApplicationNotification(data: ApplicationData) {
  const resend = getResend();

  const rows = [
    row("Name", data.fullName),
    row("Email", data.email),
    data.college ? row("College", data.college) : "",
    data.yearOfStudy ? row("Year", data.yearOfStudy) : "",
    data.teamSize ? row("Team", data.teamSize) : "",
    row("Problem", data.problem),
    data.whoHasProblem ? row("Who", data.whoHasProblem) : "",
    data.whyNow ? row("Why now", data.whyNow) : "",
    row("Why you", data.whyYou),
    data.hoursPerWeek ? row("Hours/week", data.hoursPerWeek) : "",
    data.supportArea ? row("Support", data.supportArea) : "",
    data.successVision ? row("Success vision", data.successVision) : "",
    data.loomLink ? row("Loom", data.loomLink, true) : "",
  ].join("");

  const content = `
    <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 300; color: #111110; margin: 0 0 6px;">New Application</h1>
    <p style="font-size: 13px; color: #888; margin: 0 0 28px;">Received just now &mdash; reply directly to reach ${data.fullName}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      ${rows}
    </table>

    <div style="margin-top: 28px;">
      <a href="mailto:${data.email}" style="display: inline-block; background: #111110; color: #F6F4EF; padding: 11px 24px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; border-radius: 2px;">Reply to ${data.fullName.split(" ")[0]}</a>
    </div>
  `;

  await resend.emails.send({
    from: "Arc Applications <applications@arcprogram.xyz>",
    to: "rohansharma.8574@gmail.com",
    replyTo: data.email,
    subject: `New application: ${data.fullName}`,
    html: emailWrapper(content),
  });
}

// ─── Applicant confirmation email ───
export async function sendApplicantConfirmation(data: ApplicationData) {
  const resend = getResend();

  const content = `
    <!-- Greeting -->
    <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 300; color: #111110; margin: 0 0 8px; line-height: 1.2;">
      We got your application, ${data.fullName.split(" ")[0]}.
    </h1>
    <p style="font-size: 15px; color: #666560; line-height: 1.75; margin: 0 0 28px; font-weight: 300;">
      Thanks for taking the time to apply to Arc &middot; 01. We read every application personally &mdash; expect to hear back within 5&ndash;7 days.
    </p>

    <!-- Gold divider -->
    <div style="width: 28px; height: 1px; background: #8B6338; margin: 0 0 28px;"></div>

    <!-- What happens next -->
    <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #8B6338; margin: 0 0 16px; font-weight: 500;">What happens next</h2>

    <table cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
      <tr>
        <td style="width: 32px; vertical-align: top; padding-top: 2px;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #8B6338; color: #F6F4EF; font-size: 10px; text-align: center; line-height: 20px;">1</div>
        </td>
        <td style="padding: 0 0 14px 8px; font-size: 14px; color: #333; line-height: 1.6;">
          <strong style="font-weight: 500;">Application review</strong><br>
          <span style="color: #888; font-size: 13px;">Krishna personally reads your application and Loom video.</span>
        </td>
      </tr>
      <tr>
        <td style="width: 32px; vertical-align: top; padding-top: 2px;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #8B6338; color: #F6F4EF; font-size: 10px; text-align: center; line-height: 20px;">2</div>
        </td>
        <td style="padding: 0 0 14px 8px; font-size: 14px; color: #333; line-height: 1.6;">
          <strong style="font-weight: 500;">Quick call</strong><br>
          <span style="color: #888; font-size: 13px;">If there&rsquo;s a fit, we&rsquo;ll set up a 20-minute conversation.</span>
        </td>
      </tr>
      <tr>
        <td style="width: 32px; vertical-align: top; padding-top: 2px;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #8B6338; color: #F6F4EF; font-size: 10px; text-align: center; line-height: 20px;">3</div>
        </td>
        <td style="padding: 0 0 0 8px; font-size: 14px; color: #333; line-height: 1.6;">
          <strong style="font-weight: 500;">Decision</strong><br>
          <span style="color: #888; font-size: 13px;">You&rsquo;ll hear a clear yes or no &mdash; no ghosting, ever.</span>
        </td>
      </tr>
    </table>

    <!-- Gold divider -->
    <div style="width: 28px; height: 1px; background: #8B6338; margin: 0 0 28px;"></div>

    <!-- Your submission summary -->
    <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #8B6338; margin: 0 0 16px; font-weight: 500;">Your submission</h2>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: #fafaf8; border-radius: 4px; padding: 4px;">
      <tr><td style="padding: 16px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          ${row("Problem", data.problem)}
          ${row("Why you", data.whyYou)}
          ${data.successVision ? row("Vision", data.successVision) : ""}
          ${data.loomLink ? row("Loom", data.loomLink, true) : ""}
        </table>
      </td></tr>
    </table>

    <!-- Closing -->
    <p style="font-size: 15px; color: #666560; line-height: 1.75; margin: 28px 0 0; font-weight: 300;">
      In the meantime, keep building. That&rsquo;s always the right move.
    </p>
    <p style="font-size: 14px; color: #111110; margin: 20px 0 0;">
      &mdash; Krishna<br>
      <span style="font-size: 12px; color: #888;">
        <a href="https://x.com/0xkrishnaa" style="color: #8B6338; text-decoration: none;">@0xkrishnaa</a>
      </span>
    </p>
  `;

  await resend.emails.send({
    from: "Krishna from Arc <krishna@arcprogram.xyz>",
    to: data.email,
    replyTo: "rohansharma.8574@gmail.com",
    subject: "We received your application — Arc · 01",
    html: emailWrapper(content),
  });
}
