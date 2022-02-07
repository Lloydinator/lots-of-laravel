<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Http\Requests\TransactionRequest;
use App\Traits\StripeHelperTrait;

class TransactionController extends Controller
{
    use StripeHelperTrait;

    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();

        $user_from = User::find(auth()->user()->id);
        $user_to = User::firstWhere('email', $validated['email']);

        // If balance is low, use card. Otherwise, use balance
        if ($user_from->account->balance < $validated['amount']){
            $this->useCard($user_from->account->customer_id, $validated['amount']);
            $balance_from = $user_from->account->balance;
        }
        else {
            $balance_from = $user_from->account->balance - $validated['amount'];
        }

        Transaction::create([
            'user_from' => auth()->user()->id,
            'user_to' => $user_to->id,
            'amount' => $validated['amount']
        ]);

        // Update balances
        $user_from->account->balance = $balance_from;
        $user_to->account->balance = $user_to->account->balance + $validated['amount'];

        if ($user_from->push() && $user_to->push()){
            return redirect()->back();
        }
    }
}
