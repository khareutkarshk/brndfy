import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body as {
            name: string;
            email: string;
            message: string;
        };

        // Basic validation
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL;
        if (!apiKey || !fromEmail) {
            console.error("[Contact route config error] RESEND_API_KEY and RESEND_FROM_EMAIL must be configured.");
            return NextResponse.json(
                { error: "Contact form is temporarily unavailable. Please email us directly." },
                { status: 503 }
            );
        }

        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: fromEmail,
            to: "vikash@brndfy.com",
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f7f7f8; border-radius: 12px;">
                    <div style="background: #1744FF; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
                            New Message — Brndfy Contact Form
                        </h1>
                    </div>
                    <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 120px;">
                                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Name</span>
                                </td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                    <span style="font-size: 15px; color: #111827;">${name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Email</span>
                                </td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                    <a href="mailto:${email}" style="font-size: 15px; color: #1744FF; text-decoration: none;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; vertical-align: top;">
                                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Message</span>
                                </td>
                                <td style="padding: 12px 0;">
                                    <p style="margin: 0; font-size: 15px; color: #111827; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                </td>
                            </tr>
                        </table>
                        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                Sent from brndfy.com · Reply directly to this email to respond to ${name}.
                            </p>
                        </div>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error("[Resend error]", error);
            return NextResponse.json(
                { error: "Failed to send message. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[Contact route error]", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
