// app/api/payment-success/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json({ success: false, error: "No session ID provided" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 });
    }

    // Extract payment and booking details
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const transaction_id = session.payment_intent as string;
    const user_id = parseInt(session.metadata?.user_id || "0");
    const booking_id = session.metadata?.booking_id || "";

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        user_id,
        booking_id,
        payment_method: "card",
        amount,
        transaction_id,
        payment_status: "Successful",
        payment_date: new Date(),
      },
    });

    // Update package booking status to "Completed"
    await prisma.package_bookings.update({
      where: { booking_id },
      data: {
        status: "Completed",
      },
    });

    // return NextResponse.json({ success: true, payment });

    // Redirect to user profile with success message
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/approval-status?status=success`);

  } catch (error: any) {
    console.error("Payment Success Error:", error);
    // return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/approval-status?status=failed&reason=${encodeURIComponent(error.message)}`
    );
  }
}
