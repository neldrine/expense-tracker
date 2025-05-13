<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = ['description', 'amount', 'category', 'date'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
