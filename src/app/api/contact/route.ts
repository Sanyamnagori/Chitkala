import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/core/database/mongodb";
import { contactSubmissionSchema } from "@/features/contact/validations";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSubmissionSchema.parse(body);

    let submissionId = `mock-id-${Date.now()}`;

    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(); // Uses the database name from the connection string

      const submissionData = {
        name: data.name,
        organization: data.organization || null,
        email: data.email,
        services: data.services,
        notes: data.notes || null,
        createdAt: new Date(),
      };

      const result = await db
        .collection("contactSubmissions")
        .insertOne(submissionData);

      submissionId = result.insertedId.toString();
    } else {
      console.warn("DATABASE_URL is not set. Simulating database save...");
    }

    const studioEmail = process.env.STUDIO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (resend && studioEmail) {
      const response = await resend.emails.send({
        from: `Studio Chitkala <${fromEmail}>`,
        to: studioEmail,
        replyTo: data.email,
        subject: `New postcard from ${data.name}`,
        html: `
          <h2>New contact submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Organization:</strong> ${data.organization || "—"}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Services:</strong> ${data.services.join(", ")}</p>
          <p><strong>Notes:</strong></p>
          <p>${data.notes || "—"}</p>
          <p><small>Submission ID: ${submissionId}</small></p>
        `,
      });

      if (response.error) {
        console.error("Resend API Error:", response.error);
        throw new Error(response.error.message);
      }
    } else {
      console.warn("RESEND_API_KEY or STUDIO_EMAIL is not set. Simulating email send...");
    }

    return NextResponse.json({ success: true, id: submissionId });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 400 },
      );
    }

    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 },
    );
  }
}
