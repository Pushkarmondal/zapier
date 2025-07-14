'use client';

import { useEffect, useState } from 'react';
import Appbar from "@/components/Appbar";
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/buttons/PrimaryButtons';
import { Plus } from 'lucide-react';
import axios from 'axios';

interface ZapType {
    id: string;
    name: string;
    image: string;
}

interface ZapAction {
    id: string;
    zapId: string;
    actionId: string;
    metadata: Record<string, unknown>;
    sortingOrder: number;
    type: ZapType;
}

interface ZapTrigger {
    id: string;
    zapId: string;
    triggerId: string;
    metadata: Record<string, unknown>;
    type: ZapType;
}

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: ZapAction[];
    trigger: ZapTrigger;
}

function useZaps() {
    const [zaps, setZaps] = useState<Zap[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        const fetchZaps = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get(`http://localhost:3008/api/v1/zaps/getAllZaps`, {
                    headers: {
                        'Authorization': token
                    }
                });

                const zapsData = response.data?.getAllZaps || [];
                setZaps(zapsData);
            } catch (error) {
                console.error('Error fetching zaps:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Error details:', {
                        status: error.response?.status,
                        data: error.response?.data,
                        headers: error.response?.headers
                    });
                    if (error.response?.status === 401) {
                        window.location.href = '/login';
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        if (hasMounted) {
            fetchZaps();
        }
    }, [hasMounted]);

    return { zaps, loading: loading || !hasMounted };
}
export default function DashboardPage() {
    const router = useRouter();
    const { zaps, loading } = useZaps();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-2xl font-bold text-gray-900">My Zaps</h1>
                    <PrimaryButton
                        onClick={() => router.push('/dashboard/create')}
                        size="small"
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Zap
                    </PrimaryButton>
                </div>
                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center -mt-16">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-12 h-12 border-4 border-orange-100 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-4 text-sm font-medium text-gray-600">Loading your zaps...</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        {!zaps || zaps.length === 0 ? (
                            <p className="text-gray-500">No zaps found.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {zaps.map((zap) => (
                                    <div
                                        key={zap.id}
                                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                    >
                                        <h3 className="text-lg font-semibold">{zap.trigger.type.name}</h3>
                                        <p className="text-gray-600">{zap.actions[0]?.type?.name || 'No action type'}</p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>Trigger: {zap.trigger.type.name}</p>
                                            <p>Action: {zap.actions[0]?.type?.name || 'None'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}