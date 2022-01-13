<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use Timestamp;

    public $timestamps = true;
    protected $fillable = ['name', 'amount', 'type', 'price', 'summ', 'date', 'exchange_data'];

    public function __construct($name = null, $amount = null, $type = null, $price = null, $summ = null, $date = null,$count=null, $exchange_data = null, array $attributes = [])
    {
        parent::__construct($attributes);
        $this->name = $name;
        $this->amount = $amount;
        $this->type = $type;
        $this->price = $price;
        $this->summ = $summ;
        $this->date = $date;
        $this->count = $count;
        $this->exchange_data = $exchange_data;
    }

}
