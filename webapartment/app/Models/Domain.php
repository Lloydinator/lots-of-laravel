<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Stancl\Tenancy\Database\Models\Domain as ModelsDomain;

class Domain extends ModelsDomain
{
    use HasFactory, SoftDeletes;

    public static function booted()
    {
        static::creating(fn ($domain) => 
            $domain->domain = $domain->domain . '.' . config('tenancy.central_domains')[0],
        );
    }
}
