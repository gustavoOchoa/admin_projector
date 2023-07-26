<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(){
        $result = [
            "message" => 'Url Invalida!'
        ];
        return $this->response->setJSON($result)->setStatusCode(200);
    }

    public function options(){
        return true;
    }
}
