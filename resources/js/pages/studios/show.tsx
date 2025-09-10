import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Studio {
    id: number;
    name: string;
    description: string;
    price_per_hour: number;
    equipment_list: string[];
    photo?: string;
    is_active: boolean;
    bookings?: Booking[];
}

interface Booking {
    id: number;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: string;
    user: {
        name: string;
    };
}

interface Props {
    studio: Studio;
    [key: string]: unknown;
}

export default function StudioShow({ studio }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; role: string } | null } }>().props;

    const handleBookStudio = () => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }
        
        router.visit(`/bookings/create?studio_id=${studio.id}`);
    };

    return (
        <AppShell>
            <div className="container mx-auto py-8">
                <div className="mb-6">
                    <Link href="/studios" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Kembali ke Daftar Studio
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Studio Info */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl mb-2">
                                            🎵 {studio.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-4">
                                            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                                                💰 Rp {studio.price_per_hour.toLocaleString('id-ID')}/jam
                                            </Badge>
                                            <Badge className="bg-blue-100 text-blue-800">
                                                ✅ Tersedia
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    {auth.user?.role === 'admin' && (
                                        <div className="flex gap-2">
                                            <Link href={`/admin/studios/${studio.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">📝 Deskripsi Studio</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {studio.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">🎸 Peralatan Lengkap</h3>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {studio.equipment_list.map((equipment, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>{equipment}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-3">⏰ Jadwal Operasional</h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span>Senin - Jumat:</span>
                                                <span className="font-medium">09:00 - 22:00</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <span>Sabtu - Minggu:</span>
                                                <span className="font-medium">10:00 - 24:00</span>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                            <p className="text-sm text-yellow-800">
                                                💡 <strong>Tips:</strong> Book di jam sibuk (19:00-22:00) lebih awal karena cepat penuh!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">
                                    📅 Booking Studio
                                </CardTitle>
                                <CardDescription>
                                    Sistem First Come First Served (FCFS)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        Rp {studio.price_per_hour.toLocaleString('id-ID')}
                                    </div>
                                    <p className="text-sm text-gray-600">per jam</p>
                                </div>

                                <div className="border-t border-b py-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>✅ Booking instan</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>💳 Pembayaran QRIS</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>🔄 Bisa cancel</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>🎤 Peralatan premium</span>
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    onClick={handleBookStudio}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                                >
                                    {auth.user ? '🚀 Book Sekarang' : '🔑 Masuk untuk Book'}
                                </Button>

                                {!auth.user && (
                                    <p className="text-xs text-gray-500 text-center">
                                        Perlu masuk ke akun untuk melakukan booking
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Bookings (for reference) */}
                        {studio.bookings && studio.bookings.length > 0 && (
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        📊 Booking Terbaru
                                    </CardTitle>
                                    <CardDescription>
                                        Referensi jadwal yang sudah dibooking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {studio.bookings.slice(0, 5).map((booking) => (
                                            <div key={booking.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                                <div>
                                                    <div className="font-medium">
                                                        {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                                    </div>
                                                    <div className="text-gray-600">
                                                        {booking.start_time} - {booking.end_time}
                                                    </div>
                                                </div>
                                                <Badge 
                                                    className={
                                                        booking.status === 'confirmed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                >
                                                    {booking.status === 'confirmed' ? '✅ Dikonfirmasi' : '⏳ Pending'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}