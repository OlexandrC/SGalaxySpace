<?php

namespace Sgalaxy;

defined('RUN_INTERNAL') or die();

interface IBaseDBObject{

    public function __construct();

    public function Read(int $id):bool;
    public function Update():bool;
    public function Delete():bool;

    public function Parse(array $row):bool;
    
    public function GetReadBaseSQLRequest():string;

}