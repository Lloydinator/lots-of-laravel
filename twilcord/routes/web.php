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

Route::get('/', function(Request $request, Twilio $convo){
    if (!$request->session()->has('user')){
        return redirect()->route('signin');
    }
    
    return Inertia::render('Home', [
        'convo' => $convo->listMessages($request->session()->get('sid')),
        'sid' => $request->session()->get('sid'),
        'user' => $request->session()->get('user')
    ]);
})->name('home');

Route::get('auth', function(){
    return Inertia::render('Auth', []);
})->name('signin');


Route::group(['prefix' => 'convo'], function(){
    // Create conversation
    Route::post('/create', function(Twilio $convo){
        $sid = $convo->makeConversation()->sid;        

        // Write JSON file
        FileHelpersTrait::handleJson($sid);
    
        return redirect()->back()->with('message', $sid);
    });

    // Add participant by phone number
    Route::post('/{id}/sms-participant/new', function(
            Request $request, Twilio $convo, $id
        ){
        $number = $request->number;
        $participant = $convo->createSMSParticipant($id, $number);

        // Set session
        $request->session()->put(['user' => $number, 'sid' => $id]);
        
        return redirect()->route('home')->with('message', $participant->sid);
    });
    
    // Add participant by username
    Route::post('/{id}/chat-participant/new', function(
            Request $request, Twilio $convo, $id
        ){
        $name = $request->username;
        $participant = $convo->createChatParticipant($id, $name);

        // Set session
        $request->session()->put(['user' => $name, 'sid' => $id]);
        
        return redirect()->route('home')->with('message', $participant->sid);
    });
    
    // Create a new message
    Route::post('/{id}/create-message', function(
            Request $request, Twilio $convo, $id
        ){
        $convo = new Twilio;
        $message = $convo->createMessage(
            $id, $request->session()->get('user'), $request->message
        );
    
        return redirect()->back()->with('message', $message->sid); 
    });
});
