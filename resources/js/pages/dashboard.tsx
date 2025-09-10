import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function Dashboard() {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; role: string } } }>().props;
    const user = auth.user;

    return (
        <AppShell>
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🎵 Selamat Datang, {user?.name}!
                    </h1>
                    <p className="text-gray-600">
                        {user?.role === 'admin' 
                            ? 'Dashboard Administrator EIGHTEEN COURSE & STUDIO\'S'
                            : 'Dashboard Pengguna - Kelola booking studio musik Anda'
                        }
                    </p>
                </div>

                {user?.role === 'admin' ? (
                    // Admin Dashboard
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>🏢 Kelola Studio</CardTitle>
                                        <CardDescription>
                                            Tambah, edit, hapus studio
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">🎼</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Link href="/admin/studios">
                                    <Button className="w-full">
                                        Kelola Studio
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>📅 Kelola Booking</CardTitle>
                                        <CardDescription>
                                            Konfirmasi & kelola semua booking
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">📊</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Link href="/admin/bookings">
                                    <Button className="w-full">
                                        Lihat Booking
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>👥 Kelola Pengguna</CardTitle>
                                        <CardDescription>
                                            Lihat & kelola data pengguna
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">👤</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Link href="/admin/users">
                                    <Button className="w-full">
                                        Kelola User
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>📊 Dashboard Admin</CardTitle>
                                        <CardDescription>
                                            Lihat statistik & laporan
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">📈</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Link href="/admin">
                                    <Button className="w-full">
                                        Dashboard Admin
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    // User Dashboard
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>🎵 Browse Studio</CardTitle>
                                        <CardDescription>
                                            Lihat daftar studio tersedia
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">🏢</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    Temukan studio yang sempurna untuk sesi recording Anda dengan berbagai pilihan peralatan premium.
                                </p>
                                <Link href="/studios">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                        🎼 Lihat Studio
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>📅 Riwayat Booking</CardTitle>
                                        <CardDescription>
                                            Kelola booking Anda
                                        </CardDescription>
                                    </div>
                                    <div className="text-3xl">📋</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    Lihat status booking, upload bukti pembayaran, dan kelola semua pemesanan studio Anda.
                                </p>
                                <Link href="/bookings">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        📊 Lihat Booking
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                            <CardHeader>
                                <CardTitle className="text-center">🚀 Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Link href="/bookings/create">
                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                            ➕ Booking Baru
                                        </Button>
                                    </Link>
                                    <Link href="/studios">
                                        <Button variant="outline" className="w-full">
                                            🔍 Cari Studio
                                        </Button>
                                    </Link>
                                    <Link href="/bookings">
                                        <Button variant="outline" className="w-full">
                                            📋 My Bookings
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                        🎯 Sistem First Come First Served (FCFS)
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-purple-700">
                        <div className="flex items-center gap-2">
                            <span>⚡</span>
                            <span>Booking instan & real-time</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🏃</span>
                            <span>Siapa cepat dia dapat</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>💳</span>
                            <span>Pembayaran via QRIS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✅</span>
                            <span>Konfirmasi otomatis</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}