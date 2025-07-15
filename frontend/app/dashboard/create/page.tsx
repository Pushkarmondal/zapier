'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

export default function CreateZapPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        availableTriggerId: 'webhook',
        triggerMetaData: '',
        actions: [{
            availableActionId: 'sol',
            actionMetaData: {}
        }]
    });

    // Get the trigger from URL params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const trigger = params.get('trigger');
        if (trigger) {
            setFormData(prev => ({
                ...prev,
                availableTriggerId: trigger
            }));
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.post(
                'http://localhost:3008/api/v1/zaps/create',
                formData,
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 201) {
                toast.success('Zap created successfully!');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error creating zap:', error);
            toast.error('Failed to create zap. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Zap</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="availableTriggerId">Trigger Type</Label>
                                <Input
                                    id="availableTriggerId"
                                    type="text"
                                    value={formData.availableTriggerId}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availableTriggerId: e.target.value
                                    })}
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="triggerMetaData">Trigger Metadata (JSON)</Label>
                                <Input
                                    id="triggerMetaData"
                                    type="text"
                                    value={formData.triggerMetaData}
                                    onChange={(e) => {
                                        try {
                                            const value = e.target.value;
                                            // If empty string, store as empty string
                                            if (value.trim() === '') {
                                                setFormData({
                                                    ...formData,
                                                    triggerMetaData: ''
                                                });
                                                return;
                                            }
                                            
                                            // Try to parse as JSON
                                            JSON.parse(value);
                                            setFormData({
                                                ...formData,
                                                triggerMetaData: value
                                            });
                                        } catch (error) {
                                            console.error('Invalid JSON:', error);
                                            toast.error('Invalid JSON format. Please enter valid JSON.');
                                        }
                                    }}
                                    className="mt-1 font-mono text-sm"
                                    placeholder="Enter JSON data or leave empty"
                                />
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="font-medium text-gray-900 mb-3">Action</h3>
                                <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                                    <div>
                                        <Label htmlFor="actionId">Action Type</Label>
                                        <Input
                                            id="actionId"
                                            type="text"
                                            value={formData.actions[0].availableActionId}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                actions: [{
                                                    ...formData.actions[0],
                                                    availableActionId: e.target.value
                                                }]
                                            })}
                                            className="mt-1"
                                            required
                                        />
                                    </div>

                                    {/* <div>
                                        <Label htmlFor="actionMetaData">Action Metadata (JSON)</Label>
                                        <Input
                                            id="actionMetaData"
                                            type="text"
                                            value={JSON.stringify(formData.actions[0].actionMetaData)}
                                            onChange={(e) => {
                                                try {
                                                    const parsedData = e.target.value ? JSON.parse(e.target.value) : {};
                                                    setFormData({
                                                        ...formData,
                                                        actions: [{
                                                            ...formData.actions[0],
                                                            actionMetaData: parsedData
                                                        }]
                                                    });
                                                } catch (error) {
                                                    console.log(error);
                                                    console.error('Invalid JSON');
                                                }
                                            }}
                                            className="mt-1 font-mono text-sm"
                                            placeholder="Enter JSON data or leave empty"
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/dashboard')}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                {isLoading ? 'Creating...' : 'Create Zap'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
