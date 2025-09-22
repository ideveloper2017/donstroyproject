<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Course;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'course_id',
        'certificate_number',
        'qr_code',
        'certificate_url',
        'certificate_date',
        'hour',
        'level',
        'control',
        'passport'
    ];

    protected $casts = [
        'certificate_date' => 'datetime',
    ];

    /**
     * Get the course that the student belongs to.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
