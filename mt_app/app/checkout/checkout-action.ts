// "use server";
// import { stripe } from "@/lib/stripe";
// import { CartItem } from "@/store/cart-store";
// import { redirect } from "next/navigation";

// export const checkoutAction = async (formData: FormData): Promise<void> => {
//   const itemsJson = formData.get("items") as string;
//   const items = JSON.parse(itemsJson);
//   const line_items = items.map((item: CartItem) => ({
//     price_data: {
//       currency: "cad",
//       product_data: { name: item.name },
//       unit_amount: item.price,
//     },
//     quantity: item.quantity,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items,
//     mode: "payment",
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//   });

//   redirect(session.url!);
// };





// "use server";
// import { stripe } from "../../lib/stripe";
// import { redirect } from "next/navigation";

// export const checkoutAction = async (bookingDetail:object): Promise<void> => {
//   // Mock cart data
//   const items = [
//     {
//       id: 1,
//       name: "T-shirt",
//       price: 2500, // amount in cents (e.g., $25.00)
//       quantity: 2,
//     },
//     {
//       id: 2,
//       name: "Hoodie",
//       price: 5500, // $55.00
//       quantity: 1,
//     },
//   ];

//   console.log("Booking Detail:", bookingDetail);

//   const routes = bookingDetail
//   console.log("Routes:", routes);


//   const line_items = items.map((item) => ({
//     price_data: {
//       currency: "thb",
//       product_data: { name: item.name },
//       unit_amount: item.price,
//     },
//     quantity: item.quantity,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items,
//     mode: "payment",
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/approval-status`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/approval-status`,
//   });

//   redirect(session.url!);
// };



"use server";
import { stripe } from "../../lib/stripe";
import { redirect } from "next/navigation";

interface BookingDetail {
  tourism_bookings: {
    child: number;
    adult: number;
    routes: {
      adult_price: number;
      child_price: number;
      guide_price: number;
      car_service_price: number;
    };
  };
  user_id: number;
}

export const checkoutAction = async (bookingDetail: BookingDetail, bookingId : number): Promise<void> => {
  const {
    child,
    adult,
    routes: { child_price, adult_price, guide_price, car_service_price },
  } = bookingDetail.tourism_bookings;

  // console.log("Amount Child:", child);
  // console.log("Amount Adult:", adult);
  // console.log("Price Child:", child_price);
  // console.log("Price Adult:", adult_price);
  // console.log("Price Guide:", guide_price);
  // console.log("Price Car Service:", car_service_price);
  // console.log('user_id:', bookingDetail.user_id);
  // console.log('bookingId:', bookingId);

  // ✅ Build Stripe line_items dynamically
  const line_items = [];

  if (adult > 0 && adult_price > 0) {
    line_items.push({
      price_data: {
        currency: "thb",
        product_data: { name: "Adult Ticket" },
        unit_amount: Math.round(adult_price * 100),
      },
      quantity: adult,
    });
  }

  if (child > 0 && child_price > 0) {
    line_items.push({
      price_data: {
        currency: "thb",
        product_data: { name: "Child Ticket" },
        unit_amount: Math.round(child_price * 100),
      },
      quantity: child,
    });
  }

  if (guide_price > 0) {
    line_items.push({
      price_data: {
        currency: "thb",
        product_data: { name: "Guide Service" },
        unit_amount: Math.round(guide_price * 100),
      },
      quantity: 1,
    });
  }

  if (car_service_price > 0) {
    line_items.push({
      price_data: {
        currency: "thb",
        product_data: { name: "Car Service" },
        unit_amount: Math.round(car_service_price * 100),
      },
      quantity: 1,
    });
  }

  if (line_items.length === 0) {
    throw new Error("No valid items to checkout.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/approval-status`,
    metadata: {
    user_id: bookingDetail.user_id.toString(),
    booking_id: bookingId,
  },
  });

  redirect(session.url!);
};
