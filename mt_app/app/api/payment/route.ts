import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';


// GET: Fetch all payments
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

// POST: Create a new payment
// export async function POST(request: Request) {
//   try {
//     const { user_id, booking_id, payment_date, payment_method, amount, payment_status, transaction_id } =
//       await request.json();

//     if (!booking_id || !payment_method || !amount) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const newPayment = await prisma.payment.create({
//       data: {
//         user_id,
//         booking_id,
//         payment_date: payment_date ? new Date(payment_date) : new Date(), // ✅ Default to `new Date()`
//         payment_method,
//         amount,
//         payment_status,
//         transaction_id,
//       },
//     });

//     return NextResponse.json(newPayment, { status: 201 });
//   } catch (error) {
//     console.error("Error creating payment:", error);
//     return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
//   }
// }



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      user_id,
      booking_id,
      payment_method,
      amount,
      transaction_id,
      payment_status,
    } = body;

    const payment = await prisma.payment.create({
      data: {
        user_id,
        booking_id,
        payment_method,
        amount,
        transaction_id,
        payment_status,
        payment_date: new Date(),
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}