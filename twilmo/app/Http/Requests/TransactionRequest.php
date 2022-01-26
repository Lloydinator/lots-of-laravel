<?php

namespace App\Http\Requests;

use App\Rules\CheckBalance;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required','email','exists:App\Models\User,email',Rule::notIn([auth()->user()->email])],
            'amount' => ['required','numeric',new CheckBalance()]
        ];
    }

    public function messages()
    {
        return [
            'email.exists' => 'This user doesn\'t exist.',
            'email.not_in' => 'You can\'t send money to yourself.'
        ];
    }
}
