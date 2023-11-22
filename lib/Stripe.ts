import Stripe from "stripe";

export const stripe=new Stripe(process.env.STRIPE_KEY!,{
    typescript:true,
    apiVersion:"2023-10-16"

})