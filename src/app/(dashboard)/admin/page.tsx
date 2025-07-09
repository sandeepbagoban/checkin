import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import ImageUpload from '@/components/ImageUpload';
import QRCodeGenerator from '@/components/QRCodeGenerator';

const page = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
                <h2 className="text-2xl font-semibold text-gray-800">Please login to setup your wedding event</h2>
            </div>
        );
    }

    const eventLink = `weddingapp.com/${session.user.username}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Wedding Page</h1>
                    <p className="text-lg text-pink-600">Create a beautiful digital space for your special day</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Cover Image */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cover Image Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800">Cover Image</h2>
                                <p className="text-gray-500 mt-1">This will be the main image on your wedding page</p>
                            </div>
                            <div className="p-6">
                                <ImageUpload label="Upload cover image" />
                            </div>
                        </div>

                        {/* Love Story Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800">Your Love Story</h2>
                                <p className="text-gray-500 mt-1">Share what makes your relationship special</p>
                            </div>
                            <div className="p-6">
                                <textarea 
                                    className="w-full p-4 border border-gray-200 rounded-lg min-h-[200px] focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="Tell your story... how you met, your journey together, or what you're looking forward to in marriage..."
                                />
                            </div>
                        </div>

                        {/* Gallery Preview Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800">Gallery Preview</h2>
                                <p className="text-gray-500 mt-1">A preview of how your gallery will appear</p>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <button className="px-5 py-2.5 text-sm font-medium text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors">
                                        Edit Gallery
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sharing Options */}
                    <div className="space-y-8">
                        {/* Wedding Link Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800">Share Your Wedding</h2>
                                <p className="text-gray-500 mt-1">Send this to your guests</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="p-3 bg-gray-50 rounded-lg font-mono break-all text-sm border border-gray-200">
                                    {eventLink}
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all font-medium">
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800">QR Code</h2>
                                <p className="text-gray-500 mt-1">Perfect for invitations</p>
                            </div>
                            <div className="p-6 flex flex-col items-center space-y-4">
                                <QRCodeGenerator url={eventLink} size={180} />
                                {/* <button className="w-full py-3 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors font-medium flex items-center justify-center space-x-2">
                                    <span>Download</span>
                                </button> */}
                            </div>
                        </div>

                        {/* Save & Publish */}
                        <div className="sticky top-6">
                            <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all font-bold text-lg">
                               View
                            </button>
                            <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all font-bold text-lg">
                                Save & Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;