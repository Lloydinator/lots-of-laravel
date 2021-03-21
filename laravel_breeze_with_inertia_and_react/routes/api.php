<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Services\Twilio;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test-convo', function(){
    $convo = new Twilio();
    $sid = $convo->makeConversation()->sid;

    $chatService = $convo->fetchConversation($sid);

    $participant = $convo->makeParticipant($sid);
    dd($participant->sid);
});