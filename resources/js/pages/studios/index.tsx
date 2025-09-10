import React from 'react';
import { Link, usePage } from '@inertiajs/react';
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
}

interface Props {
    studios: {
        data: Studio[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function StudiosIndex({ studios }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; role: string } | null } }>().props;

    return (
        <AppShell>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🎵 Daftar Studio EIGHTEEN COURSE & STUDIO'S
                        </h1>
                        <p className="text-gray-600">
                            Pilih studio terbaik untuk sesi recording Anda
                        </p>
                    </div>
                    
                    {auth.user?.role === 'admin' && (
                        <Link href="/admin/studios/create">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                ➕ Tambah Studio
                            </Button>
                        </Link>
                    )}
                </div>

                {studios.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎵</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Belum ada studio tersedia
                        </h3>
                        <p className="text-gray-600">
                            Studio akan segera hadir untuk Anda
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studios.data.map((studio) => (
                            <Card key={studio.id} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">
                                            {studio.name}
                                        </CardTitle>
                                        <Badge className="bg-green-100 text-green-800">
                                            💰 Rp {studio.price_per_hour.toLocaleString('id-ID')}/jam
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="mb-4">
                                        {studio.description.length > 120 
                                            ? `${studio.description.slice(0, 120)}...`
                                            : studio.description
                                        }
                                    </CardDescription>
                                    
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">🎸 Peralatan:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {studio.equipment_list.slice(0, 4).map((equipment, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {equipment}
                                                </Badge>
                                            ))}
                                            {studio.equipment_list.length > 4 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{studio.equipment_list.length - 4} lainnya
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Link href={`/studios/${studio.id}`} className="flex-1">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                👁️ Lihat Detail
                                            </Button>
                                        </Link>
                                        
                                        {auth.user && (
                                            <Link href={`/bookings/create?studio_id=${studio.id}`}>
                                                <Button className="bg-purple-600 hover:bg-purple-700">
                                                    📅 Book
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {studios.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: studios.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/studios?page=${page}`}
                                    className={`px-3 py-2 rounded ${
                                        page === studios.current_page
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}