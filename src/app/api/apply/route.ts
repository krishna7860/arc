import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendApplicationNotification, sendApplicantConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      college,
      yearOfStudy,
      teamSize,
      problem,
      whoHasProblem,
      whyNow,
      whyYou,
      hoursPerWeek,
      supportArea,
      successVision,
      loomLink,
    } = body;

    if (!fullName || !email || !problem || !whyYou) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("applications").insert({
      full_name: fullName,
      email,
      college: college || null,
      year_of_study: yearOfStudy || null,
      team_size: teamSize || null,
      problem,
      who_has_problem: whoHasProblem || null,
      why_now: whyNow || null,
      why_you: whyYou,
      hours_per_week: hoursPerWeek || null,
      support_area: supportArea || null,
      success_vision: successVision || null,
      loom_link: loomLink || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save application" },
        { status: 500 }
      );
    }

    // Send emails (non-blocking — don't fail the response)
    const emailData = {
      fullName, email, college, yearOfStudy, teamSize,
      problem, whoHasProblem, whyNow, whyYou,
      hoursPerWeek, supportArea, successVision, loomLink,
    };

    try {
      await Promise.all([
        sendApplicationNotification(emailData),
        sendApplicantConfirmation(emailData),
      ]);
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
