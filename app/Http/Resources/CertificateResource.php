<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'certificate_number' => $this->certificate_number,
            'issue_date' => $this->issue_date->format('Y-m-d'),
            'expiry_date' => $this->expiry_date ? $this->expiry_date->format('Y-m-d') : null,
            'grade' => $this->grade,
            'status' => $this->status,
            'verification_token' => $this->verification_token,
            'is_expired' => $this->isExpired(),
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'email' => $this->student->email,
                'photo' => $this->student->photo_url,
            ],
            'course' => [
                'id' => $this->course->id,
                'name' => $this->course->name,
                'category' => $this->course->category,
                'duration' => $this->course->duration,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
