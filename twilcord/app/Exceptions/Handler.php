<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Twilio\Exceptions\TwilioException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function(Throwable $e, $request){
            if ($e instanceof TwilioException){
                $status = 409;
            }
            else if ($e instanceof HttpException){
                $status = $e->getStatusCode();
            }
            else {
                $status = 500;
            }

            switch ($status){
                case 403:
                    $code = $status;
                    $message = "You're not allowed to see this."; 
                    break;
                case 409: 
                    $code = $status;
                    $message = substr($e->getMessage(), 11); 
                    break;
                case 419: 
                    $code = $status;
                    $message = "This page has expired. Please refresh."; 
                    break;
                default: 
                    $code = 500;
                    $message = "Something went wrong"; 
                    break;
                }

            return redirect()->back()->with([
                'inertia_error' => [
                    'code' => $code,
                    'message' => $message
                ]
            ]);
        });
    }
}
