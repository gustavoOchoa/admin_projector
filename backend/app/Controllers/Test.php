<?php

namespace App\Controllers;

use App\Models\TestModel;

class Test extends BaseController
{
    public function index(){
        try{
            $model = new TestModel();
            $data = $model->getAll(6);
            return $this->response->setJSON($data)->setStatusCode(200);
        }
        catch (\Exception $e) {
            $resp = [
                'message' => html_entity_decode($e->getMessage()),
                'resultado' => 'NOOK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(409);
        }
    }
}