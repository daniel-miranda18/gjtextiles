<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $response = redirect()->intended(route('welcome', ['verified' => 1]));
        } else {
            if ($request->user()->markEmailAsVerified()) {
                event(new Verified($request->user()));
            }
            $response = Inertia::render('Welcome', [
                'success' => 'Se verificó exitosamente el correo electrónico'
            ]);
        }
        return $response;
    }
}
