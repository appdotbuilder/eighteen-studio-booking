<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_hour' => 'required|numeric|min:0',
            'equipment_list' => 'required|array|min:1',
            'equipment_list.*' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
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
            'name.required' => 'Nama studio wajib diisi.',
            'description.required' => 'Deskripsi studio wajib diisi.',
            'price_per_hour.required' => 'Harga per jam wajib diisi.',
            'price_per_hour.numeric' => 'Harga per jam harus berupa angka.',
            'price_per_hour.min' => 'Harga per jam tidak boleh kurang dari 0.',
            'equipment_list.required' => 'Daftar peralatan wajib diisi.',
            'equipment_list.min' => 'Minimal harus ada 1 peralatan.',
            'equipment_list.*.required' => 'Nama peralatan tidak boleh kosong.',
            'photo.image' => 'File harus berupa gambar.',
            'photo.mimes' => 'Format gambar yang diizinkan: jpeg, png, jpg, gif.',
            'photo.max' => 'Ukuran gambar maksimal 2MB.',
        ];
    }
}