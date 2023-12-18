<?php
use Firebase\JWT\JWT;

// HELPER GENERAL

if (!function_exists('pre')) {

    /*** imprime una variable y corta la ejecucion de un proceso
     * @param $variable
     * @return string
     */
    function pre($variable){
        echo "<pre>";
        print_r($variable);
        echo "</pre>";
        die();
    }
}

if (!function_exists('nvl')) {
    /**
    funcion de php que simula nvl de ORACLE
     */
    function nvl ($key, $else) {
        return ($key!='' ? $key : $else);
    }
}

if (!function_exists('like_match')) {
    /**
    compara como un LIKE de sql
    $esp = (like_match('ESP-%', $p_tipo)==true)? 'TRUE' : 'FALSE';
     **/
    function like_match($pattern, $subject){
        $pattern = str_replace('%', '.*', preg_quote($pattern, '/'));
        return (bool) preg_match("/^{$pattern}$/i", $subject);
    }
}

if(!function_exists('file_log')){

    function file_log($whereAmI) {
        $nombreArchivo = WRITEPATH.'stepper.txt';
        $text = $whereAmI. PHP_EOL;
        $archivo = fopen($nombreArchivo, "at");
        fwrite($archivo, $text);
        fclose($archivo);
    }

}

if(!function_exists('getTokenVal')){

    function getTokenVal($val){
        $model = new \App\Models\Framework\TokenModel();
        $secret = $model->getSecret();
        $key = new \Firebase\JWT\key ($secret,'HS256');
        try{
            $vars = \Firebase\JWT\JWT::decode($_SERVER['HTTP_TOKEN'], $key);
        }
        catch (\Throwable $e){
            $vars = '';
        }
        return $vars->$val;
    }
}

if(!function_exists('getSecretKey')){

    function getSecretKey(){
        return getenv('JWT_SECRET_KEY');
    }
}

if(!function_exists('getSignedJWTForUser')){
    function getSignedJWTForUser($email, $id_user, $user_type){
        helper('projector_helper');
        $issuedAtTime = time();
        $tokenTimeToLive = getenv('JWT_TIME_TO_LIVE');
        $tokenExpiration = $issuedAtTime + $tokenTimeToLive;
        $payload = [
            'uuid' => $id_user,
            'email' => $email,
            'role' => $user_type,
            'iat' => $issuedAtTime,
            'exp' => $tokenExpiration
        ];

        $jwt = JWT::encode($payload, getSecretKey(), 'HS256');
        return $jwt;
    }
}