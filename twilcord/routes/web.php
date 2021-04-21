<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Services\Twilio;
use Inertia\Inertia;
use App\Traits\FileHelpersTrait;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// CH4b6eb9a690b34db690dddf8123626a3d
Route::get('/', function(Request $request){
    if ($request->has('id')){
        $convo = new Twilio;
        $messages = $convo->listMessages($request->id);

        return redirect()->back()->with('message', $messages);
    }
    
    return Inertia::render('Home', []);
});

Route::group(['prefix' => 'convo'], function(){
    // Create conversation
    Route::post('/create', function(){
        $convo = new Twilio();
        $sid = $convo->makeConversation()->sid;        

        // Write JSON file
        FileHelpersTrait::handleJson($sid);
    
        // Return to React frontend
        return redirect()->back()->with('message', $sid);
    });

    // Add participant by phone number
    Route::post('/{id}/sms-participant/new', function(Request $request, $id){
        $convo = new Twilio;
        $number = $request->number;
        $participant = $convo->createSMSParticipant($id, $number);
        
        return redirect()->back()->with('message', $participant->sid);
    });
    
    // Add participant by username
    Route::post('/{id}/chat-participant/new', function(Request $request, $id){
        $convo = new Twilio;
        $name = $request->username;
        $participant = $convo->createChatParticipant($id, $name);
        
        return redirect()->back()->with('message', $participant->sid);
    });
    
    // Create a new message
    Route::post('/{id}/create-message', function(Request $request, $id){
        $convo = new Twilio;
        $message = $convo->createMessage($id, $request->username, $request->message);
    
        return redirect()->back()->with('message', $message->sid); 
    });
    
    // Get all messages
    Route::get('/{id}/messages', function($id){
        $convo = new Twilio;
        $messages = $convo->listMessages($id);
    
        return response()->json(['messages' => $messages]);
    });
});
