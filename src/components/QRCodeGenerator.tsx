"use client";

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FiDownload } from 'react-icons/fi';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url, 
  size = 200 
}) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        const code = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
        setQrCode(code);
      } catch (err) {
        console.error('Error generating QR code:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [url, size]);

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `wedding-qr-${url.split('/').pop() || 'code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="animate-pulse rounded-lg bg-gray-200" style={{ width: size, height: size }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {qrCode && (
        <img 
          src={qrCode} 
          alt={`QR Code for ${url}`}
          className="rounded-lg border border-gray-200"
          style={{ width: size, height: size }}
        />
      )}
      <button
        onClick={downloadQRCode}
        disabled={!qrCode}
        className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors"
      >
        <FiDownload className="h-4 w-4" />
        <span>Download QR Code</span>
      </button>
    </div>
  );
};

export default QRCodeGenerator;