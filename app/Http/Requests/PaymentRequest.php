<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
			'payment_id' => 'required|string',
			'payment_status' => 'required|string',
			'payment_method' => 'required|string',
			'amount' => 'required',
			'currency' => 'required|string',
			'user_id' => 'required',
        ];
    }
}
