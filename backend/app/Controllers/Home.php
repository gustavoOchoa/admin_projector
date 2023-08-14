<?php

namespace App\Controllers;
use App\Models\TestModel;

class Home extends BaseController
{
    public function index(){
        file_log('hora: '.date('d.m.Y h:i:s A'));
        $model = new TestModel();
        $result = $model->getModel();
        return $this->response->setJSON($result)->setStatusCode(200);
    }

    public function options(){
        return true;
    }
}
