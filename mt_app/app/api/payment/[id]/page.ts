import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch a single payment by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentId = Number(params.id)
    const payment = await prisma.payment.findUnique({
      where: { payment_id: paymentId },
      include: {
        users: true, // Include user details
        package_bookings: true, // Include booking details
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json({ error: "Failed to fetch payment" }, { status: 500 });
  }
}

// PUT: Update payment by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentId = Number(params.id)
    const { user_id, booking_id, payment_date, payment_method, amount, payment_status, transaction_id } =
      await request.json();

    const updatedPayment = await prisma.payment.update({
      where: { payment_id : paymentId },
      data: {
        user_id,
        booking_id,
        payment_date: payment_date ? { set: new Date(payment_date) } : undefined, // Fix here
        payment_method,
        amount,
        payment_status,
        transaction_id,
      },
    });

    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}

// DELETE: Remove payment by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentId = Number(params.id)
    await prisma.payment.delete({
      where: { payment_id : paymentId },
    });

    return NextResponse.json({ message: "Payment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
