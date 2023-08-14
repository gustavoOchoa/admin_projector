<?php
namespace App\Models;
use CodeIgniter\Model;

class TestModel extends Model{

    public function __construct(){
        parent::__construct();
        $this->db = \Config\Database::connect('default');
    }

    public function getModel(){
        try{
            $builder = $this->db->table('projects');
            $query = $builder->select('id_project, project_name')
                ->get();
            return $query->getResultArray();
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            throw new \RuntimeException($e->getMessage());
        }
    }


    public function getAll($project_id){
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
                ->where('node_father', 0)
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
                if($row['type'] == 'folder'){
                    $node->children = $this->getRecursiveNode($row['node_id']);
                }
                array_push($ret, $node);
            }
            return $ret;
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            throw new \RuntimeException($e->getMessage());
        }
    }


}