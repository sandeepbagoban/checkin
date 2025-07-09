'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import QRCodeGenerator from '@/components/QRCodeGenerator';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    coverImage?: string;
    date: string;
    slug: string;
    description?: string;
  };
}

const EventModal = ({ isOpen, onClose, event }: EventModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isMounted) return null;

  const eventLink = `${window.location.origin}/${event.slug}`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal container */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-3xl z-50 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-white shadow-xl overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white shadow-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Left Column - Event Preview (2/3 width) */}
            <div className="lg:col-span-2 p-8 overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h2>
              
              <div className="mb-8">
                {event.coverImage ? (
                  <div className="h-96 bg-gray-100 rounded-xl overflow-hidden">
                    <img 
                      src={event.coverImage} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-96 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-24 h-24 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Love Story</h3>
                  <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                </div>
              )}
            </div>

            {/* Right Column - Sharing Options (1/3 width) */}
            <div className="bg-gray-50 p-8 border-l border-gray-200 overflow-y-auto">
              <div className="sticky top-0 space-y-8">
                <h3 className="text-2xl font-semibold text-gray-900">Share Your Wedding</h3>
                
                {/* Event Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Link</label>
                  <div className="p-4 bg-white rounded-lg border border-gray-200 font-mono text-sm break-all">
                    {eventLink}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(eventLink)}
                    className="mt-3 w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    Copy Link
                  </button>
                </div>

                {/* QR Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">QR Code</label>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
                    <QRCodeGenerator url={eventLink} size={180} />
                    <button className="mt-4 w-full py-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium">
                      Download QR Code
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Event Details</h4>
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;