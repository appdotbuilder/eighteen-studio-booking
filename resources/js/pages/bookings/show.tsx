import React, { useState } from 'react';
import { Link, useForm, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Booking {
    id: number;
    booking_date: string;
    start_time: string;
    end_time: string;
    total_price: number;
    status: string;
    payment_status: string;
    payment_proof?: string;
    notes?: string;
    confirmed_at?: string;
    studio: {
        id: number;
        name: string;
        price_per_hour: number;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    booking: Booking;
    [key: string]: unknown;
}

export default function BookingShow({ booking }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; role: string } | null } }>().props;
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        payment_proof: null as File | null,
    });

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { class: 'bg-yellow-100 text-yellow-800', text: '⏳ Menunggu Konfirmasi', icon: '⏳' },
            confirmed: { class: 'bg-green-100 text-green-800', text: '✅ Dikonfirmasi', icon: '✅' },
            cancelled: { class: 'bg-red-100 text-red-800', text: '❌ Dibatalkan', icon: '❌' },
            completed: { class: 'bg-blue-100 text-blue-800', text: '🎵 Selesai', icon: '🎵' },
        };
        return badges[status as keyof typeof badges] || badges.pending;
    };

    const getPaymentStatusBadge = (status: string) => {
        const badges = {
            unpaid: { class: 'bg-red-100 text-red-800', text: '💸 Belum Dibayar', icon: '💸' },
            pending: { class: 'bg-yellow-100 text-yellow-800', text: '⏳ Menunggu Verifikasi', icon: '⏳' },
            paid: { class: 'bg-green-100 text-green-800', text: '✅ Sudah Dibayar', icon: '✅' },
            refunded: { class: 'bg-gray-100 text-gray-800', text: '💰 Dikembalikan', icon: '💰' },
        };
        return badges[status as keyof typeof badges] || badges.unpaid;
    };

    const handlePaymentUpload = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.payment_proof) return;
        
        const formData = new FormData();
        formData.append('payment_proof', data.payment_proof);
        formData.append('_method', 'PATCH');
        
        post(`/bookings/${booking.id}`, {
            forceFormData: true,
            preserveState: true,
            onSuccess: () => {
                setShowPaymentForm(false);
                setData('payment_proof', null);
            },
        });
    };

    const handleCancelBooking = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan booking ini?')) {
            router.delete(`/bookings/${booking.id}`, {
                preserveState: true,
                onSuccess: () => {
                    router.visit('/bookings');
                },
            });
        }
    };

    const statusBadge = getStatusBadge(booking.status);
    const paymentBadge = getPaymentStatusBadge(booking.payment_status);

    return (
        <AppShell>
            <div className="container mx-auto py-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/bookings" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Kembali ke Daftar Booking
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Booking Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    📅 Booking #{booking.id}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    <Badge className={statusBadge.class}>
                                        {statusBadge.text}
                                    </Badge>
                                    <Badge className={paymentBadge.class}>
                                        {paymentBadge.text}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">🎵 Detail Studio</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium">{booking.studio.name}</span>
                                            <span className="text-sm text-gray-600">
                                                Rp {booking.studio.price_per_hour.toLocaleString('id-ID')}/jam
                                            </span>
                                        </div>
                                        <Link href={`/studios/${booking.studio.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                                            👁️ Lihat Detail Studio →
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">⏰ Jadwal Booking</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                                            <div className="text-2xl mb-1">📅</div>
                                            <div className="font-semibold">
                                                {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg text-center">
                                            <div className="text-2xl mb-1">🕐</div>
                                            <div className="font-semibold">
                                                {booking.start_time} - {booking.end_time}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Durasi: {((new Date(`2024-01-01T${booking.end_time}`).valueOf() - new Date(`2024-01-01T${booking.start_time}`).valueOf()) / (1000 * 60 * 60)).toFixed(1)} jam
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                                            <div className="text-2xl mb-1">💰</div>
                                            <div className="font-bold text-purple-600">
                                                Rp {booking.total_price.toLocaleString('id-ID')}
                                            </div>
                                            <div className="text-sm text-gray-600">Total Biaya</div>
                                        </div>
                                    </div>
                                </div>

                                {booking.notes && (
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">📝 Catatan</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-700">{booking.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {booking.confirmed_at && (
                                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-800">
                                            <span className="text-xl">✅</span>
                                            <span className="font-semibold">Booking Dikonfirmasi</span>
                                        </div>
                                        <p className="text-sm text-green-700 mt-1">
                                            Dikonfirmasi pada: {new Date(booking.confirmed_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {auth.user?.id === booking.user.id && booking.status === 'pending' && (
                                <>
                                    <Link href={`/bookings/${booking.id}/edit`}>
                                        <Button variant="outline">
                                            ✏️ Edit Booking
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleCancelBooking}
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                        ❌ Batalkan
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Payment Panel */}
                    <div className="lg:col-span-1">
                        {booking.payment_status === 'unpaid' && booking.status === 'confirmed' && auth.user?.id === booking.user.id && (
                            <Card className="sticky top-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl">
                                        💳 Pembayaran QRIS
                                    </CardTitle>
                                    <CardDescription>
                                        Scan QR Code untuk membayar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* QR Code Placeholder */}
                                    <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg">
                                        <div className="text-center">
                                            <div className="text-6xl mb-2">📱</div>
                                            <div className="text-sm text-gray-600 mb-2">QR Code QRIS</div>
                                            <div className="text-xs text-gray-500">
                                                EIGHTEEN COURSE & STUDIO'S<br/>
                                                Bank BCA/Mandiri/BRI/BNI
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600 mb-1">
                                            Rp {booking.total_price.toLocaleString('id-ID')}
                                        </div>
                                        <p className="text-sm text-gray-600">Total yang harus dibayar</p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="text-sm text-gray-600 mb-3">
                                            Setelah transfer, upload bukti pembayaran:
                                        </p>
                                        
                                        {!showPaymentForm ? (
                                            <Button 
                                                onClick={() => setShowPaymentForm(true)}
                                                className="w-full bg-green-600 hover:bg-green-700"
                                            >
                                                📸 Upload Bukti Transfer
                                            </Button>
                                        ) : (
                                            <form onSubmit={handlePaymentUpload} className="space-y-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setData('payment_proof', e.target.files?.[0] || null)}
                                                    className="w-full text-sm"
                                                    required
                                                />
                                                <div className="flex gap-2">
                                                    <Button 
                                                        type="submit" 
                                                        disabled={processing || !data.payment_proof}
                                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                                        size="sm"
                                                    >
                                                        {processing ? '📤 Uploading...' : '✅ Upload'}
                                                    </Button>
                                                    <Button 
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setShowPaymentForm(false)}
                                                        size="sm"
                                                    >
                                                        Batal
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {booking.payment_status === 'pending' && (
                            <Card>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg text-yellow-600">
                                        ⏳ Menunggu Verifikasi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Bukti pembayaran sudah diupload dan sedang diverifikasi oleh admin.
                                    </p>
                                    {booking.payment_proof && (
                                        <p className="text-xs text-green-600">
                                            ✅ File: {booking.payment_proof}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {booking.payment_status === 'paid' && (
                            <Card className="border-green-200 bg-green-50">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg text-green-600">
                                        ✅ Pembayaran Berhasil
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="text-4xl mb-3">🎉</div>
                                    <p className="text-sm text-green-700">
                                        Pembayaran telah dikonfirmasi! Silakan datang sesuai jadwal yang telah ditentukan.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">ℹ️ Informasi Penting</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <div className="flex items-start gap-2">
                                    <span>📍</span>
                                    <span>Alamat: Jl. Musik No. 18, Jakarta</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span>📞</span>
                                    <span>Telp: (021) 123-4567</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span>⏰</span>
                                    <span>Datang 15 menit sebelum jadwal</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span>🎫</span>
                                    <span>Bawa booking ID: #{booking.id}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}