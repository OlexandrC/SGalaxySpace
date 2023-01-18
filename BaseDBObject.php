<?php

namespace Sgalaxy;

use Exception;

defined('RUN_INTERNAL') or die();

abstract class BaseDBObject implements IBaseDBObject{

    public int $ID;
    protected string $_table;

    public function Delete():bool{
        return DB::ExecuteAsPrepared("DELETE FROM `".$this->_table."` WHERE `id`=:id", [':id'=>$this->ID]);
    }

    public function GetLastID():int{
        $rows = DB::ExecuteAsPreparedFetched("SELECT `id` FROM `".$this->_table."` WHERE 1 ORDER BY `id` DESC LIMIT 1", []);
        if ($rows === false) {return 0;}
        if (count($rows) === 0) {return 0;}
        return intval($rows[0]['id']);
    }

    public function CreateByParams(array $params):bool{
        $namesArr = array_keys($params);
        $names = '';
        $values = '';
        foreach ($namesArr as $name) {
            if (strlen($names) > 0) {$names = $names.", ";}
            $names = $names." `".$name."`";

            if (strlen($values) > 0) {$values = $values.", ";}
            $values = $values." :".$name;
        }

        return DB::ExecuteAsPrepared("INSERT INTO `".$this->_table."`($names) VALUES ($values)", $params);
    }

    public function UpdateByParams(array $params):bool{
        $nameAndValue = '';
        foreach ($params as $key => $value) {
            if (strlen($nameAndValue) > 0) {$nameAndValue = $nameAndValue.", ";}
            $nameAndValue = $nameAndValue."`$key`='$value'";
        }

        return DB::ExecuteAsPrepared("UPDATE `".$this->_table."` SET $nameAndValue WHERE `id`=:id", [':id'=>$this->ID]);
    }

    public function ReadOneRow(int $id):array{
        $rows = DB::ExecuteAsPreparedFetched($this->GetReadBaseSQLRequest()."WHERE `".$this->_table."`.`id` = :id", [':id' => $id]);

        if ($rows === false) {
            throw new Exception('No rows during exucution');
        }

        if (count($rows) !== 1) {
            return [];
        }

        return $rows[0];
    }

    public function Read(int $id):bool{
        $row = $this->ReadOneRow($id);
        if (count($row) === 0) {return false;}
        return $this->Parse($row);
    }

    public function GetReadBaseSQLRequest():string{
        return "SELECT * FROM `".$this->_table."` ";
    }

    public function GetTableName():string{
        return $this->_table;
    }

}