<?php

namespace App\Traits;

use Faker\Factory as Faker;

trait FileHelpersTrait {
    
    public static function handleJson($data){
        $randomString = str_replace(' ', '', Faker::create()->bs);

        if (!file_exists(base_path('public/sid.json'))){
            $json = json_encode([
                'sid' => $data, 'chat_name' => "#".$randomString
            ], JSON_PRETTY_PRINT);
            file_put_contents(base_path('public/sid.json'), stripslashes($json));
            return;
        }
        // Read file
        $json = file_get_contents(base_path('public/sid.json'));
        $file = json_decode($json, true);

        // Update file
        $file['sid'] = $data;
        $file['chat_name'] = "#".$randomString;

        // Write to file
        $json = json_encode($file, JSON_PRETTY_PRINT);
        file_put_contents(base_path('public/sid.json'), stripslashes($json));
        return;
    }
}