<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'studio_id' => 'required|exists:studios,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'notes' => 'nullable|string|max:1000',
            'payment_proof' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'studio_id.required' => 'Studio wajib dipilih.',
            'studio_id.exists' => 'Studio yang dipilih tidak valid.',
            'booking_date.required' => 'Tanggal booking wajib diisi.',
            'booking_date.date' => 'Format tanggal tidak valid.',
            'booking_date.after_or_equal' => 'Tanggal booking tidak boleh di masa lalu.',
            'start_time.required' => 'Waktu mulai wajib diisi.',
            'start_time.date_format' => 'Format waktu mulai tidak valid (HH:MM).',
            'end_time.required' => 'Waktu selesai wajib diisi.',
            'end_time.date_format' => 'Format waktu selesai tidak valid (HH:MM).',
            'end_time.after' => 'Waktu selesai harus setelah waktu mulai.',
            'notes.max' => 'Catatan maksimal 1000 karakter.',
            'payment_proof.image' => 'File harus berupa gambar.',
            'payment_proof.mimes' => 'Format gambar yang diizinkan: jpeg, png, jpg, gif.',
            'payment_proof.max' => 'Ukuran gambar maksimal 2MB.',
        ];
    }
}