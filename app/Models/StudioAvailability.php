<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudioAvailability
 *
 * @property int $id
 * @property int $studio_id
 * @property string $date
 * @property string $start_time
 * @property string $end_time
 * @property bool $is_blocked
 * @property string|null $blocked_reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Studio $studio
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereStudioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereIsBlocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereBlockedReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudioAvailability available()
 * @method static \Database\Factories\StudioAvailabilityFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StudioAvailability extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'studio_id',
        'date',
        'start_time',
        'end_time',
        'is_blocked',
        'blocked_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_blocked' => 'boolean',
    ];

    /**
     * Get the studio that owns the availability slot.
     */
    public function studio(): BelongsTo
    {
        return $this->belongsTo(Studio::class);
    }

    /**
     * Scope a query to only include available slots.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_blocked', false);
    }
}