<?php

namespace App\Traits;

trait StripeHelperTrait {
    function __construct()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    }
    
    function createCustomer($email, $name)
    {
        $customer = \Stripe\Customer::create([
            'name' => $name,
            'email' => $email
        ]);
        return $customer;
    }

    function getPaymentMethods($customer_id)
    {
        $customer = \Stripe\PaymentMethod::all(
            ['customer' => $customer_id, 'type' => 'card']
        );
        return $customer;
    }

    function createSetupIntent($customer_id)
    {
        $intent = \Stripe\SetupIntent::create([
            'customer' => $customer_id
        ]);

        return $intent->client_secret;
    }

    function useCard($customer_id, $amount)
    {
        $card = $this->getPaymentMethods($customer_id);

        try {
            \Stripe\PaymentIntent::create([
                'amount' => $amount * 100,
                'currency' => 'usd',
                'customer' => $customer_id,
                'payment_method' => $card->data[0]->id,
                'off_session' => true,
                'confirm' => true
            ]);
        }
        catch (\Stripe\Exception\CardException $e){
            return response()->back()->with([
                'error' => 'Something went wrong. Error code: ' . $e->getMessage()
            ]);
        }
    }
}