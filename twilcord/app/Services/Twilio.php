<?php

namespace App\Services;

use Twilio\Rest\Client;
use Carbon\Carbon;

class Twilio {
    protected $sid;
    protected $token;
    protected $twilio_number;
    protected $client;

    public function __construct(){
        $this->sid = getenv('TWILIO_ACCOUNT_SID');
        $this->token = getenv('TWILIO_AUTH_TOKEN');
        $this->twilio_number = getenv('TWILIO_PHONE_NUMBER');
        

        $this->client = new Client($this->sid, $this->token);
    }

    public function makeConversation(){
        $conversation = $this->client->conversations->v1
                            ->conversations
                            ->create([
                                "friendlyName" => "My Chat App"
                            ]);

        return $conversation;
    }

    public function fetchConversation($sid){
        $conversation = $this->client->conversations->v1
                            ->conversations($sid)
                            ->fetch();
        return $conversation;
    }

    public function createSMSParticipant($sid, $number){
        $participant = $this->client->conversations->v1
                            ->conversations($sid)
                            ->participants
                            ->create([
                                'messagingBindingAddress' => $number,
                                'messagingBindingProxyAddress' => $this->twilio_number
                            ]);
        return $participant;
    }

    public function createChatParticipant($sid, $chat_id){
        $participant = $this->client->conversations->v1
                            ->conversations($sid)
                            ->participants
                            ->create([
                                'identity' => $chat_id
                            ]);
        return $participant;
    }

    public function createMessage($sid, $author, $body){
        $message = $this->client->conversations->v1
                        ->conversations($sid)
                        ->messages
                        ->create([
                            'author' => $author,
                            'body' => $body
                        ]);
        return $message;
    }

    public function showMessage($sid, $message_id){
        $message = $this->client->conversations->v1
                        ->conversations($sid)
                        ->messages($message_id)
                        ->fetch();
        return $message;
    }

    public function listMessages($sid){
        $messages = $this->client->conversations->v1
                        ->conversations($sid)
                        ->messages
                        ->read(30);
        $array = array();
        foreach($messages as $message){
            array_push($array, [
                $message->sid,
                $message->author,
                $message->body,
                $this->convertTime($message->dateCreated)
            ]);
        }
        return $array;
    }

    private function convertTime($date){
        $dt = Carbon::parse($date);
        $new = $dt->toDayDateTimeString();

        return $new;
    }
}

