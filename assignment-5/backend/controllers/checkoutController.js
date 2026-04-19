import Stripe from 'stripe';

export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'inr', 
        product_data: {
          name: item.title,
          description: `Annual Premium for ${item.title}`,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/dashboard?payment_success=true`,
      cancel_url: `http://localhost:5173/cart?payment_canceled=true`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};
