<?php
namespace App\Models;

use CodeIgniter\Model;

class ProjectModel extends Model {

    public function __construct(){
        parent::__construct();
        $this->db = \Config\Database::connect('default');
    }

    public function insertProject($name_project){
        try{
            $this->db->transBegin();
            $data = [
                'project_name' => $name_project,
                'id_user' => 5
            ];
            $builder = $this->db->table('projects');
            $builder->insert($data);
            if ($this->db->transStatus() === false) {
                $this->db->transRollback();
            } else {
                $this->db->transCommit();
            }
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            throw new \RuntimeException($e->getMessage());
        }
    }

    public function getAllProjects($user){
        try{
            $builder = $this->db->table('projects');
            $query = $builder->select('id_project, project_name')
                ->where('id_user', $user)
                ->get();
            return $query->getResultArray();
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            throw new \RuntimeException($e->getMessage());
        }
    }

    public function getlist($father_node, $project_id){
        $ret = [];
        try{
            $builder = $this->db->table('nodes');
            $query = $builder->select("node_id,
                node_name as label,
                (case
                    when node_type = 'folder' then 'false'
                    else 'true'
                end) as leaf,
                concat(node_name, ' ', node_type) as data,
                node_type as type,
                (case
                    when node_type = 'doc' then 'pr pr-document'
                    when node_type = 'folder' then 'pr pr-folder'
                    else 'pr pr-list'
                end) as icon")
                ->where('project_id', $project_id)
                ->where('node_father', $father_node)
                ->get();
            $base = $query->getResultArray();
            foreach ($base as $row) {
                $node = new \stdClass();
                $node->key = $row['node_id'];
                $node->label = $row['label'];
                $node->leaf = ($row['leaf']=='false')? false : true;
                $node->data = $row['data'];
                $node->type = $row['type'];
                $node->icon = $row['icon'];
                array_push($ret, $node);
            }
            return $ret;
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            throw new \RuntimeException($e->getMessage());
        }
    }

}