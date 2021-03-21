<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::get('/create-convo', function(){
    // Create conversation
    $convo = new Twilio();
    $sid = $convo->makeConversation()->sid;

    return response()->json([
        'sid' => $sid
    ]);
});

Route::get('/convo/{id}/fetch', function($id){
    // Fetch the conversation
    $convo = new Twilio;
    $chatService = $convo->fetchConversation($id);

    return response()->json([
        'conversation' => $chatService->chatServiceSid
    ]);    
});

Route::get('/convo/{id}/make-participant', function($id){
    // Add conversation participant
    $convo = new Twilio;
    $number = '+16465801404';
    $participant = $convo->makeParticipant($id, $number);
    
    return response()->json([
        'participant' => $participant->sid
    ]);
});

Route::get('/convo/{id}/new-participant', function(Request $request, $id){
    // Add a new chat participant
    $convo = new Twilio;
    $name = $request->username;
    $participant = $convo->addNewParticipant($id, $name);
    
    return response()->json([
        'participant' => $participant->sid
    ]);
});

Route::post('/convo/{id}/create-message', function(Request $request, $id){
    // Create a new message
    $convo = new Twilio;
    $message = $convo->createMessage($id, $request->username, $request->message);

    return response()->json([
        'message_id' => $message->sid
    ]);
});

Route::get('/convo/{id}/message/{mid}', function($id, $mid){
    // Get a specific message
    $convo = new Twilio;
    $message = $convo->showMessage($id, $mid);

    return response()->json([
        'author' => $message->author,
        'body' => $message->body,
        'time' => $message->date_created
    ]);
});

Route::get('/convo/{id}/messages', function($id){
    // Get all messages
    $convo = new Twilio;
    $messages = $convo->listMessages($id);

    return response()->json([
        'messages' => $messages
    ]);
});