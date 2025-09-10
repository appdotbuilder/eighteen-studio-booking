import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
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
}

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    studios: Studio[];
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister, studios }: Props) {
    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                {/* Hero Section */}
                <section className="relative py-20 px-4">
                    <div className="container mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                🎵 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    EIGHTEEN COURSE & STUDIO'S
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
                                Sistem Booking Studio Musik Terdepan dengan Algoritma First Come First Served (FCFS) 
                                untuk Pengalaman Recording Terbaik Anda
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {canLogin && (
                                <Link href="/login">
                                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                                        🚀 Masuk ke Akun
                                    </Button>
                                </Link>
                            )}
                            {canRegister && (
                                <Link href="/register">
                                    <Button size="lg" variant="outline" className="border-purple-400 text-white hover:bg-purple-400 hover:text-white px-8 py-3">
                                        ✨ Daftar Sekarang
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">
                            🎯 Mengapa Memilih Kami?
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card className="bg-white/10 backdrop-blur-sm border-purple-400/30">
                                <CardHeader className="text-center">
                                    <div className="text-4xl mb-2">⚡</div>
                                    <CardTitle className="text-white">Booking Instan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-blue-200 text-center">
                                        Sistem FCFS memastikan siapa cepat dia dapat - booking studio dalam hitungan detik!
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-white/10 backdrop-blur-sm border-purple-400/30">
                                <CardHeader className="text-center">
                                    <div className="text-4xl mb-2">🎤</div>
                                    <CardTitle className="text-white">Peralatan Premium</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-blue-200 text-center">
                                        Peralatan recording berkualitas tinggi dari brand ternama dunia
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-white/10 backdrop-blur-sm border-purple-400/30">
                                <CardHeader className="text-center">
                                    <div className="text-4xl mb-2">💳</div>
                                    <CardTitle className="text-white">Pembayaran QRIS</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-blue-200 text-center">
                                        Bayar dengan mudah menggunakan QRIS - upload bukti transfer langsung di app
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-white/10 backdrop-blur-sm border-purple-400/30">
                                <CardHeader className="text-center">
                                    <div className="text-4xl mb-2">📱</div>
                                    <CardTitle className="text-white">Kelola Booking</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-blue-200 text-center">
                                        Lihat riwayat, batalkan booking, dan kelola semua pemesanan Anda dengan mudah
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Studios Preview */}
                {studios.length > 0 && (
                    <section className="py-16 px-4">
                        <div className="container mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    🎼 Studio Unggulan Kami
                                </h2>
                                <p className="text-blue-200 text-xl">
                                    Pilih dari berbagai studio dengan fasilitas terlengkap
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {studios.map((studio) => (
                                    <Card key={studio.id} className="bg-white/10 backdrop-blur-sm border-purple-400/30 hover:bg-white/20 transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle className="text-white text-lg">
                                                {studio.name}
                                            </CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-green-600 text-white">
                                                    💰 Rp {studio.price_per_hour.toLocaleString('id-ID')}/jam
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-blue-200 mb-4">
                                                {studio.description.slice(0, 100)}...
                                            </CardDescription>
                                            
                                            <div className="mb-4">
                                                <h4 className="text-white font-semibold mb-2">🎸 Peralatan:</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {studio.equipment_list.slice(0, 3).map((equipment, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-200">
                                                            {equipment}
                                                        </Badge>
                                                    ))}
                                                    {studio.equipment_list.length > 3 && (
                                                        <Badge variant="outline" className="text-xs border-purple-400 text-purple-200">
                                                            +{studio.equipment_list.length - 3} lainnya
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <Link href={`/studios/${studio.id}`}>
                                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                                    📅 Lihat Detail & Book
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            
                            <div className="text-center">
                                <Link href="/studios">
                                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
                                        🎵 Lihat Semua Studio
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* User Journey Section */}
                <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">
                            🚀 Cara Booking Studio
                        </h2>
                        
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                                    1️⃣
                                </div>
                                <h3 className="text-white font-bold mb-2">Daftar/Masuk</h3>
                                <p className="text-blue-200">Buat akun atau masuk ke akun yang sudah ada</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                                    2️⃣
                                </div>
                                <h3 className="text-white font-bold mb-2">Pilih Studio</h3>
                                <p className="text-blue-200">Browse studio dan pilih yang sesuai kebutuhan</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                                    3️⃣
                                </div>
                                <h3 className="text-white font-bold mb-2">Booking & Bayar</h3>
                                <p className="text-blue-200">Pilih waktu, booking, dan bayar via QRIS</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                                    4️⃣
                                </div>
                                <h3 className="text-white font-bold mb-2">Recording!</h3>
                                <p className="text-blue-200">Datang dan mulai sesi recording Anda</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            🎶 Siap Mulai Recording?
                        </h2>
                        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                            Jangan sampai kehabisan slot! Sistem FCFS kami memastikan yang booking duluan, dapat duluan.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            {canLogin && (
                                <Link href="/login">
                                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4">
                                        🚀 Masuk & Book Sekarang
                                    </Button>
                                </Link>
                            )}
                            {canRegister && (
                                <Link href="/register">
                                    <Button size="lg" variant="outline" className="border-purple-400 text-white hover:bg-purple-400 hover:text-white px-8 py-4">
                                        ✨ Daftar Gratis
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}