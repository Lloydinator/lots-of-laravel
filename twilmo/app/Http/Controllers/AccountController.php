<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\StripeHelperTrait;
use Inertia\Inertia;

class AccountController extends Controller
{
    use StripeHelperTrait;

    public function index()
    {
        $account = User::find(auth()->user()->id)->account;

        $secret = $this->createSetupIntent($account->customer_id);

        $payment_method = $this->getPaymentMethods($account->customer_id);

        return Inertia::render('Profile', [
            'user' => User::find(auth()->user()->id),
            'account' => $account,
            'client_secret' => $secret,
            'payment_method' => $payment_method
        ]);
    }
}
