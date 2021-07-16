<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message'];

    public function user()
    {
        return $this->hasMany(User::class, 'id', 'to_id');
    }

    public function replies()
    {
        return $this->hasMany(Message::class, 'to_id');
    }
}
