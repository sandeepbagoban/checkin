'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import EventModal from './EventModal';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    coverImage?: string;
    date: string;
    slug: string;
    description?: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {event.coverImage ? (
          <div className="h-48 bg-gray-100 relative">
            <img 
              src={event.coverImage} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-500 mt-1">
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-pink-500 hover:text-pink-700 transition-colors"
                title="Preview"
              >
                <FiEye className="w-5 h-5" />
              </button>
              <Link
                href={`/admin/events/edit/${event.id}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Edit"
              >
                <FiEdit className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
              {event.slug}
            </span>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Modal */}
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventCard;