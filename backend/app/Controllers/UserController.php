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
        $username = base64_decode($this->request->getPost('username'));
        $password = base64_decode($this->request->getPost('password'));
        $email = base64_decode($this->request->getPost('email'));
        $password2 = base64_decode($this->request->getPost('password2'));

        if($password != $password2){
            $result = [
                "message" => 'Las contraseñas no son iguales.',
                "error" => 'NOOK'
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }

        $userModel = new UserModel();
        $valid = $this->validateUser($username, $email);
        if($valid){
            $encrypPass = hash("sha256", $password);
            try{
                $userModel->registerUser($username, $email, $encrypPass);
                $result = [
                    "message" => 'Usuario creado correctamente, pronto recibirá un correo para validar su email',
                    "error" => 'OK'
                ];
                $emailStatus = $this->sendUserEmail($username, $email);
                if($emailStatus->response != 'OK'){
                    $result = [
                        "message" => 'Hubo un error en el envio de email.',
                        "error" => 'NOOK'
                    ];
                    return $this->response->setJSON($result)->setStatusCode(200);
                }

                return $this->response->setJSON($result)->setStatusCode(200);
            }
            catch (Exception $exception) {
                $result = [
                    'message' => $exception->getMessage(),
                    'error' => 'NOOK'
                ];
                return $this->response->setJSON($result)->setStatusCode(403);
            }
        }
        else{
            $result = [
                "message" => $valid,
                "error" => 'NOOK'
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }
    }

    public function login(){
        helper('cookie');
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

                $cookie = [
                    'name'     => 'access_token',
                    'value'    => null,
                    'expire'   => 0,
                    'path'     => getenv('COOKIE_PATH'),
                    'secure'   => (getenv('COOK_SECURE') == 'false')? false : true,
                    'httponly' => (getenv('COOK_HTTP_ONLY') == 'false')? false : true,
                    'samesite' => getenv('SAMESITE')
                ];
                set_cookie($cookie);
                return $this->response->setJSON($result)->setStatusCode(200);
            }
            return $this->getJWTForUser($email, $exist[0]['id_user'], $exist[0]['username']);
        }
        catch (Exception $exception){
            $result = [
                'error' => 'Ha ocurrido un Error al loguearse',
                'access_token' => ''
            ];
            return $this->response->setJSON($result)->setStatusCode(200);
        }
    }

    private function getJWTForUser($emailAddress, $id_user, $username){
        $userModel = new UserModel();
        try {
            helper('cookie');
            helper('projector_helper');

            $userData = $userModel->getUserDataByEmail($emailAddress);

            $token = getSignedJWTForUser($emailAddress, $id_user, $userData['user_type']);

            $result = [
                'error' => 'OK',
                'user' => $username,
                'email' => $userData['email'],
                'user_type' => $userData['user_type'],
                'avatar' => $userData['avatar'],
                'lang' => 'eng'
            ];

            $cookieExpiration = time();

            $cookie = [
                'name'     => 'access_token',
                'value'    => $token,
                'expire'   => $cookieExpiration,
                'path'     => getenv('COOKIE_PATH'),
                'secure'   => (getenv('COOK_SECURE') == 'false')? false : true,
                'httponly' => (getenv('COOK_HTTP_ONLY') == 'false')? false : true,
                'samesite' => getenv('SAMESITE')
            ];
            set_cookie($cookie);

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

    private function sendUserEmail($username, $to){
        $email = \Config\Services::email();
        $view = \Config\Services::renderer();

        $html = $view->setVar('message', 'Validar Email a traves del siguiente LINK')->render('emails/register-template');

        $email->setTo($to);
        $email->setFrom('gustavoeochoa@gmail.com', 'Projector Email Service');

        $email->setSubject('Validación de Email de Registro');
        $email->setMessage($html);

        $obj = new \stdClass();
        if($email->send()){
            $obj->response = 'OK';
            $obj->message = 'Se envió el correo electrónico.';
        }
        else{
            $obj->response = 'NOOK';
            $obj->email = $email;
            $obj->error = $email->printDebugger(['body']);
            $obj->message = 'No se pudo enviar el correo electrónico';
        }
        return $obj;
    }
}