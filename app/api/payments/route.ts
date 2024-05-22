import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined in environment variables.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10'
});

import { NextResponse } from "next/server";
import { cartData } from '../../../typescript';

interface BodyData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  country: string;
  zipCode: string;
  carts: cartData[];
}

export async function POST(req: Request) {
  try {
    const { firstName,lastName, phone, email, streetAddress, city, country, zipCode, carts }: BodyData = await req.json();
console.log(carts)
    // Create a new customer
    const customer = await stripe.customers.create({
      name:firstName+' ' +lastName,
      phone,
      email,
      address: {
        line1: streetAddress,
        city,
        country,
        postal_code: zipCode.toString(), // Stripe expects postal code as string
      }
    });

    // Create line items for the checkout session
    const lineItems = carts.map(cart => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: cart?.product?.name, 
        },
        unit_amount: cart?.product?.salesPrice * 100, 
      },
      quantity: cart.quantity,
    }));

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?token=${customer?.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?token=${customer?.id}`,
      customer: customer?.id,
      line_items: lineItems,
    });
  
    return NextResponse.json({
      msg: "Checkout session created successfully",
      url: checkoutSession.url
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch payment",
      error,
    },
    { status: 500 });
  }
}
