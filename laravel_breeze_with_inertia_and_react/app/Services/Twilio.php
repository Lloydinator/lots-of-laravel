<?php

namespace App\Services;

use Twilio\Rest\Client;

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
        $conversation = $this->client->conversations->v1->conversations->create([
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

    public function makeParticipant($sid){
        $participant = $this->client->conversations->v1
                            ->conversations($sid)
                            ->participants
                            ->create([
                                'messagingBindingAddress' => "+16465801404",
                                'messagingBindingProxyAddress' => $this->twilio_number
                            ]);
        return $participant;
    }
}

