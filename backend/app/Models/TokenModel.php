<?php
namespace App\Models;

use CodeIgniter\Model;

class TokenModel extends Model {

    public function __construct(){
        parent::__construct();
        $this->db = \Config\Database::connect('default');
    }

    public function getSecret(){
        $query = $this->db->query("select d_data 
            from general_tables
            where n_table = 919 and 
                  c_data= 'TOKEN_SECR'");
        $arr = $query->getResultArray();
        return $arr[0]['d_data'];
    }
}