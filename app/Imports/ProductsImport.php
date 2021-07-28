<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithUpserts;

class ProductsImport implements ToModel, WithUpserts
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Product([
            'category_id' => $row[1],
            'slug' => Str::slug($row[3]),
            'title' => $row[3],
            'description' => $row[4],
            'price' => $row[5],
            'shipping_charge' => $row[6],
            'days_of_delivery' => $row[7],
            'deduction' => $row[8],
            'qty' => $row[9],
            'size' => $row[10],
            'loved' => $row[11],
            'image' => $row[12],
            'front_image' => $row[13],
            'side1_image' => $row[14],
            'side2_image' => $row[15],
            'color' => $row[16],
            'brand' => $row[20],
        ]);

        
    }
    public function uniqueBy()
    {
        return 'id';
    }
}
