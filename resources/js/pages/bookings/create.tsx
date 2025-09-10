import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Studio {
    id: number;
    name: string;
    price_per_hour: number;
    equipment_list: string[];
}



interface Props {
    studio?: Studio;
    studios: Studio[];
    [key: string]: unknown;
}

export default function CreateBooking({ studio, studios }: Props) {
    const [selectedStudio, setSelectedStudio] = useState<Studio | null>(studio || null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { data, setData, post, processing, errors } = useForm({
        studio_id: studio?.id || 0,
        booking_date: '',
        start_time: '',
        end_time: '',
        notes: '',
    });

    const calculatePrice = (startTime: string, endTime: string) => {
        if (!selectedStudio || !startTime || !endTime) return 0;
        
        const start = new Date(`2024-01-01T${startTime}`);
        const end = new Date(`2024-01-01T${endTime}`);
        const hours = (end.valueOf() - start.valueOf()) / (1000 * 60 * 60);
        
        return Math.max(0, hours * selectedStudio.price_per_hour);
    };

    const handleStudioChange = (studioId: number) => {
        const studio = studios.find(s => s.id === studioId);
        setSelectedStudio(studio || null);
        setData('studio_id', studioId);
        
        if (data.start_time && data.end_time) {
            setTotalPrice(calculatePrice(data.start_time, data.end_time));
        }
    };

    const handleTimeChange = (field: 'start_time' | 'end_time', value: string) => {
        setData(field, value);
        
        const startTime = field === 'start_time' ? value : data.start_time;
        const endTime = field === 'end_time' ? value : data.end_time;
        
        if (selectedStudio && startTime && endTime) {
            setTotalPrice(calculatePrice(startTime, endTime));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/bookings', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Will redirect to booking detail
            },
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto py-8 max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📅 Booking Studio Baru
                    </h1>
                    <p className="text-gray-600">
                        Isi form berikut untuk membuat booking studio (sistem FCFS)
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>🎵 Pilih Studio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Studio *
                                </label>
                                <select
                                    value={data.studio_id}
                                    onChange={(e) => handleStudioChange(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value={0}>Pilih Studio...</option>
                                    {studios.map((studio) => (
                                        <option key={studio.id} value={studio.id}>
                                            {studio.name} - Rp {studio.price_per_hour.toLocaleString('id-ID')}/jam
                                        </option>
                                    ))}
                                </select>
                                {errors.studio_id && (
                                    <p className="text-sm text-red-600">{errors.studio_id}</p>
                                )}
                            </div>

                            {selectedStudio && (
                                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">🎸 Peralatan Studio:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedStudio.equipment_list.slice(0, 6).map((equipment, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {equipment}
                                            </Badge>
                                        ))}
                                        {selectedStudio.equipment_list.length > 6 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{selectedStudio.equipment_list.length - 6} lainnya
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Tanggal & Waktu</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                    Tanggal Booking *
                                </label>
                                <input
                                    type="date"
                                    value={data.booking_date}
                                    onChange={(e) => setData('booking_date', e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                {errors.booking_date && (
                                    <p className="text-sm text-red-600 mt-1">{errors.booking_date}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Waktu Mulai *
                                    </label>
                                    <input
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => handleTimeChange('start_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                    {errors.start_time && (
                                        <p className="text-sm text-red-600 mt-1">{errors.start_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Waktu Selesai *
                                    </label>
                                    <input
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => handleTimeChange('end_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                    {errors.end_time && (
                                        <p className="text-sm text-red-600 mt-1">{errors.end_time}</p>
                                    )}
                                </div>
                            </div>

                            {totalPrice > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-green-800">Total Biaya:</span>
                                        <span className="text-xl font-bold text-green-600">
                                            Rp {totalPrice.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-green-700 mt-1">
                                        Durasi: {((new Date(`2024-01-01T${data.end_time}`).valueOf() - new Date(`2024-01-01T${data.start_time}`).valueOf()) / (1000 * 60 * 60)).toFixed(1)} jam
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>📝 Catatan Tambahan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Catatan khusus untuk booking Anda (opsional)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                rows={3}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
                            )}
                        </CardContent>
                    </Card>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                            ⚡ Sistem First Come First Served (FCFS)
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Yang booking duluan akan mendapat prioritas</li>
                            <li>• Booking akan dikonfirmasi dalam maksimal 1 jam</li>
                            <li>• Lakukan pembayaran dalam 24 jam setelah konfirmasi</li>
                            <li>• Upload bukti pembayaran untuk finalisasi booking</li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/studios')}
                            className="flex-1"
                        >
                            ← Kembali
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !selectedStudio || totalPrice <= 0}
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                            {processing ? 'Memproses...' : '🚀 Buat Booking'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}