<?php

namespace App\Traits;

trait StripeHelperTrait {
    function __construct()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    }

    /** Save and reuse */
    
    // Create customer first
    function createCustomer($email, $name)
    {
        $customer = \Stripe\Customer::create([
            'name' => $name,
            'email' => $email
        ]);
        return $customer;
    }

    // Get customer
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
}