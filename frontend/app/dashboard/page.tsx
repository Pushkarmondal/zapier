'use client';

import { useEffect, useState } from 'react';
import Appbar from "@/components/Appbar";
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/buttons/PrimaryButtons';
import { Plus, Play, Zap, ChevronRight, Search, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const availableTriggers = [
        { id: 'webhook', name: 'Webhook', description: 'Trigger a zap when a webhook is called', icon: '🌐' },
        { id: 'schedule', name: 'Schedule', description: 'Run your zap on a schedule', icon: '⏰' },
        { id: 'email', name: 'Email', description: 'Trigger when you receive a new email', icon: '✉️' },
    ];

    const filteredTriggers = availableTriggers.filter(trigger =>
        trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trigger.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleTriggerSelect = (triggerId: string) => {
        router.push(`/dashboard/create?trigger=${triggerId}`);
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-2xl font-bold text-gray-900">My Zaps</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <PrimaryButton size="small" className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Zap
                            </PrimaryButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                            <DialogHeader className="px-6 pt-6 pb-4 border-b">
                                <DialogTitle className="text-2xl font-bold">Choose a trigger</DialogTitle>
                                <DialogDescription>
                                    Select an app to trigger your zap
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-6">
                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search for an app"
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                    {filteredTriggers.map((trigger) => (
                                        <Card
                                            key={trigger.id}
                                            className="cursor-pointer hover:bg-accent transition-colors"
                                            onClick={() => handleTriggerSelect(trigger.id)}
                                        >
                                            <CardContent className="p-4 flex items-center">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent mr-4 text-lg">
                                                    {trigger.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium">{trigger.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {trigger.description}
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {filteredTriggers.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No triggers found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
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
                    <div className="mt-6 border rounded-md">
                        <Table>
                            <TableCaption className="mt-4">
                                {!zaps || zaps.length === 0 ? 'No zaps found' : ''}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Trigger</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {zaps?.map((zap) => (
                                    <TableRow key={zap.id} className="hover:bg-slate-50">
                                        <TableCell className="font-medium">
                                            {zap.trigger.type.name} → {zap.actions[0]?.type?.name || 'No action'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                {zap.trigger.type.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                {zap.actions[0]?.type?.name || 'No action'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end">
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                                                    title="Run Zap"
                                                >
                                                    <Play className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}