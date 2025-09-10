<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Studio
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $price_per_hour
 * @property array $equipment_list
 * @property string|null $photo
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $bookings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StudioAvailability> $availability
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Studio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Studio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Studio query()
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio wherePricePerHour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereEquipmentList($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studio active()
 * @method static \Database\Factories\StudioFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Studio extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price_per_hour',
        'equipment_list',
        'photo',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'equipment_list' => 'array',
        'price_per_hour' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the bookings for the studio.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the availability slots for the studio.
     */
    public function availability(): HasMany
    {
        return $this->hasMany(StudioAvailability::class);
    }

    /**
     * Scope a query to only include active studios.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}