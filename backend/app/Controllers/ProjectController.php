<?php
namespace App\Controllers;

use App\Models\ProjectModel;
use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;
use Psr\Log\LoggerInterface;

class ProjectController extends BaseController{

    public function index(){
        try {
            $model = new ProjectModel();
            $uid = $this->request->getPost('uid');
            $resp = $model->getAllProjects($uid);
            
            return $this->response->setJSON($resp)->setStatusCode(200);
        }
        catch (\Exception $e) {
            $resp = [
                'message' => html_entity_decode($e->getMessage()),
                'resultado' => 'NOOK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(409);
        }
    }

    public function newProject(){
        try {
            $model = new ProjectModel();
            $projName = $this->request->getPost('project_name');
            $model->insertProject($projName);
            $resp = [
                'message' => 'Proyecto agregado correctamente!',
                'resultado' => 'OK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(200);
        }
        catch (\Exception $e) {
            $resp = [
                'message' => html_entity_decode($e->getMessage()),
                'resultado' => 'NOOK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(409);
        }
    }

    public function getList(){
        try {
            $model = new ProjectModel();
            $proj_id = $this->request->getPost('uid');
            $list = $model->getlist(0, $proj_id);
            $resp = [
                'list' => $list,
                'resultado' => 'OK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(200);
        }
        catch (\Exception $e) {
            $resp = [
                'message' => html_entity_decode($e->getMessage()),
                'resultado' => 'NOOK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(409);
        }
    }

    public function getInternalNode(){
        try {
            $model = new ProjectModel();
            $proj_id = $this->request->getPost('uid');
            $father_node = $this->request->getPost('node');
            $list = $model->getlist($father_node, $proj_id);
            $resp = [
                'node' => $list,
                'resultado' => 'OK'
            ];
            return $this->response->setJSON($resp)->setStatusCode(200);
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