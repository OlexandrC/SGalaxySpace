<?php

namespace Sgalaxy;

defined('RUN_INTERNAL') or die();
	
class Ore extends BaseDBObject implements IBaseDBObject, IStorageItem{

    public int $Size;
    public int $Price;

    public function __construct(){
        $this->_table = "ore";
    }

    public function Create(int $size):bool{
        return $this->CreateByParams(
            [
                'size' => $size
            ]
        );
    }

    public function Parse($row):bool{
        $this->ID = $row['id'];
        $this->Size = intval($row['size']);

        $this->Price = ceil($this->Size / 100);

        return true;
    }

    public function Update():bool{
        return $this->UpdateByParams(
            [
                'size'=>$this->Size
            ]
        );
    }

    public function GetStorageItem():StorageItem|bool{
        $storageItem = new StorageItem();
        if ($storageItem->ReadItem(StorageItemTypeEnum::$Ore, $this->ID)) {
            return $storageItem;
        }
        
        return false;
    }

    public function CreateStorageItem(int $storageType, int $storageID, $x = 0, $y = 0):StorageItem{
        $storageItem = new StorageItem();
        $storageItem->Create($storageType, $storageID, $x, $y, StorageItemTypeEnum::$Ore, $this->ID, StorageItemSpriteIndexEnum::Ore_01());
        $storageItem->Read($storageItem->GetLastID());
        return $storageItem;
    }

}