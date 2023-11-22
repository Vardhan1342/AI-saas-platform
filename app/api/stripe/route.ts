import { stripe } from "@/lib/Stripe";
import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settinsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId) {
      return new NextResponse("unauthrozed", { status: 401 });
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settinsUrl,
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settinsUrl,
      cancel_url: settinsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Genius Pro",
              description: "unlimited AI Generator",
            },
            unit_amount: 20000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } 
  catch (error) 
  {
    console.log(error);
    return new NextResponse(
    "Internal Server error in setting route path:stripr/route.js",{status:500}
    );
  }
}
