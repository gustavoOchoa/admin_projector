<?php
namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;
use Psr\Log\LoggerInterface;

class UserController extends BaseController{

    public function register(){
        helper('projector_helper');
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');
        $email = $this->request->getPost('email');
        $userModel = new UserModel();
        $valid = $this->validateUser($username, $email);
        if($valid){
            $encrypPass = hash("sha256", $password);
            pre($encrypPass);
            try{
                $userModel->registerUser($username, $email, $encrypPass);
                $result = [
                    "message" => 'Usuario creado correctamente',
                    "code" => 'OK'
                ];
                return $this->response->setJSON($result)->setStatusCode(200);
            }
            catch (Exception $exception) {
                $result = [
                    'error' => $exception->getMessage(),
                    'code' => 'NOOK'
                ];
                return $this->response->setJSON($result)->setStatusCode(200);
            }
        }
        else{
            $result = [
                "message" => $valid,
                "code" => 'NOOK'
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }
    }

    public function login(){
        $userModel = new UserModel();
        $email = base64_decode($this->request->getPost('email'));
        $password = base64_decode($this->request->getPost('password'));
        $encryp = hash("sha256", $password);
        try{
            $exist = $userModel->loginUser($email, $encryp);
            if(count($exist) == 0){
                $result = [
                    'error' => 'No se ha encontrado a su Usuario en nuestra base de datos',
                    'access_token' => ''
                ];
                return $this->response->setJSON($result)->setStatusCode(200);
            }
            return $this->getJWTForUser($email);
        }
        catch (Exception $exception){
            $result = [
                'error' => 'Ha ocurrido un Error al loguearse',
                'access_token' => ''
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }
    }

    private function getJWTForUser($emailAddress, $responseCode = ResponseInterface::HTTP_OK){
        try {
            $model = new UserModel();
            helper('projector_helper');
            $user = $model->findUserByEmailAddress($emailAddress);
            $result = [
                'error' => 'OK',
                'user' => $user->username,
                'access_token' => getSignedJWTForUser($emailAddress)
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        } catch (Exception $exception) {
            $result = [
                'error' => $exception->getMessage(),
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }
    }

    private function validateUser($username, $email){
        $userModel = new UserModel();
        $validate = $userModel->userExists($username, $email);
        if($validate == true){
            return true;
        }
        else{
            return 'El usuario ya existe!';
        }
    }
}