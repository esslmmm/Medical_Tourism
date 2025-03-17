import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch a single payment by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { payment_id: parseInt(params.id) },
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
    const payment_id = parseInt(params.id);
    const { uer_id, booking_id, payment_date, payment_method, amount, payment_status, transaction_id } =
      await request.json();

    const updatedPayment = await prisma.payment.update({
      where: { payment_id },
      data: {
        uer_id,
        booking_id,
        payment_date: payment_date ? new Date(payment_date) : null,
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
    const payment_id = parseInt(params.id);

    const deletedPayment = await prisma.payment.delete({
      where: { payment_id },
    });

    return NextResponse.json({ message: "Payment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
