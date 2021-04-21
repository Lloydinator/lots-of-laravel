<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\Twilio;
use App\Traits\FileHelpersTrait;


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

Route::group(['prefix' => 'convo'], function(){
    // Create conversation
    Route::post('/create', function(){
        $convo = new Twilio();
        $sid = $convo->makeConversation()->sid;

        FileHelpersTrait::handleJson($sid);
    
        return response()->json([
            'sid' => $sid
        ]);
    });

    // Add conversation participant
    Route::post('/{id}/sms-participant/new', function(Request $request, $id){
        $convo = new Twilio;
        $number = $request->number;
        $participant = $convo->createSMSParticipant($id, $number);
        
        return response()->json([
            'participant' => $participant->sid
        ]);
    });
    
    // Add a new chat participant
    Route::post('/{id}/chat-participant/new', function(Request $request, $id){
        $convo = new Twilio;
        $name = $request->username;
        $participant = $convo->createChatParticipant($id, $name);
        
        return response()->json([
            'participant' => $participant->sid
        ]);
    });
    
    // Create a new message
    Route::post('/{id}/create-message', function(Request $request, $id){
        $convo = new Twilio;
        $message = $convo->createMessage($id, $request->username, $request->message);
    
        return response()->json([
            'message_id' => $message->sid
        ]);
    });
    
    // Get all messages
    Route::get('/{id}/messages', function($id){
        $convo = new Twilio;
        $messages = $convo->listMessages($id);
    
        return response()->json([
            'messages' => $messages
        ]);
    });
});

