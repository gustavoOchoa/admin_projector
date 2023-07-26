<?php
namespace App\Filters;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use Exception;

class JWTAuthenticationFilter implements FilterInterface{

    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null){
        $authenticationHeader = $request->getServer('HTTP_AUTHORIZATION');
        try {
            $encodedToken = $this->getJWTFromRequest($authenticationHeader);
            $this->validateJWTFromRequest($encodedToken);
            return $request;
        }
        catch (Exception $e) {
            return Services::response()->setJSON(['error' => $e->getMessage()])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }

    public function after(RequestInterface $request,
                          ResponseInterface $response,
                          $arguments = null){ }

    private function getJWTFromRequest($authenticationHeader){
        if (is_null($authenticationHeader)) { //JWT is absent
            throw new Exception('Missing or invalid JWT in request');
        }
        //JWT is sent from client in the format Bearer XXXXXXXXX
        return explode(' ', $authenticationHeader)[1];
    }

    private function validateJWTFromRequest($encodedToken){
        helper('projector_helper');
        $key = getSecretKey();
        $decodedToken = JWT::decode($encodedToken, $key, ['HS256']);
        $userModel = new UserModel();
        $user_count = $userModel->findUserByEmailAddress($decodedToken->email);
        if($user_count == 1){
            return true;
        }
        else{
            throw new Exception('Error en email de usuario');
        }
    }

}