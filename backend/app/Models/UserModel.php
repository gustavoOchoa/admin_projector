<?php
namespace App\Models;
use CodeIgniter\Model;

class UserModel extends Model {

    public function __construct(){
        parent::__construct();
        $this->db = \Config\Database::connect('default');
    }

    public function loginUser($email, $pass){
        $builder = $this->db->table('users');
        $query = $builder->select("id_user, username, email, user_type, role")
            ->where('email', $email)
            ->where('password', $pass)
            ->get();
        $ret = $query->getResultArray();
        return $ret;
    }

    public function findUserByEmailAddress($email){
        $builder = $this->db->table('users');
        $query = $builder->select("username")
            ->where('email', $email)
            ->get();
        $ret = $query->getRowObject();
        return $ret;
    }

    public function userExists($username, $email){
        $builder = $this->db->table('users');
        $query = $builder->select("count(1)")
            ->where('password', $username)
            ->where('password', $email)
            ->get();
        $ret = $query->getRowObject();
        return $ret;
    }

    public function registerUser($username, $email, $encrypPass){
        $builder = $this->db->table('users');
        $data = [
            'username'  => $username,
            'password'  => $encrypPass,
            'email'     => $email,
            'user_type' => 'admin',
            'n_table_user_type' => 1,
            'role' => 1
        ];
        $builder->insert($data);
    }
}