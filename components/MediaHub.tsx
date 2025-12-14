import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, Video, X, SwitchCamera, AlertCircle } from 'lucide-react';

export const MediaHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [mediaItems, setMediaItems] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMediaItems(prev => [url, ...prev]);
    }
  };

  // Camera Handlers
  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera Error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError("Camera permission was denied. Please allow camera access in your browser settings to use this feature.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera device found on your system.");
      } else {
        setError("Could not start camera. Please ensure it is not being used by another application.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setMediaItems(prev => [dataUrl, ...prev]);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <Video className="mr-2 text-purple-600" /> Media Hub
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Upload or capture technique videos and progress photos for analysis.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => { setActiveTab('upload'); stopCamera(); }}
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'upload' ? 'bg-slate-50 dark:bg-slate-800 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Upload Media
          </button>
          <button 
            onClick={() => { setActiveTab('camera'); startCamera(); }}
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'camera' ? 'bg-slate-50 dark:bg-slate-800 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Use Camera
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'upload' ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <Upload className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200">Drag and drop files here</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Support for images and videos</p>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-block font-medium">
                Browse Files
                <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center min-h-[300px] justify-center">
              {error ? (
                 <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900 max-w-md">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-3" />
                    <h3 className="text-red-700 dark:text-red-400 font-bold mb-1">Access Error</h3>
                    <p className="text-red-600 dark:text-red-300 text-sm mb-4">{error}</p>
                    <button onClick={startCamera} className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Try Again</button>
                 </div>
              ) : isCameraActive ? (
                <div className="relative w-full max-w-lg bg-black rounded-lg overflow-hidden shadow-lg">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-auto"></video>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button onClick={stopCamera} className="bg-red-500 p-3 rounded-full text-white shadow-lg hover:bg-red-600 transition-transform hover:scale-105">
                       <X size={24} />
                    </button>
                    <button onClick={capturePhoto} className="bg-white p-4 rounded-full text-blue-600 shadow-lg hover:bg-slate-100 ring-4 ring-blue-500/30 transition-transform hover:scale-105">
                       <Camera size={32} />
                    </button>
                  </div>
                </div>
              ) : (
                 <div className="text-center py-10">
                    <Camera className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">Camera is currently inactive.</p>
                    <button onClick={startCamera} className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">Start Camera</button>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Uploads</h3>
        {mediaItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((url, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden shadow-sm aspect-square bg-slate-100 dark:bg-slate-800">
                <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <button className="text-white bg-slate-900/50 p-2 rounded-full hover:bg-red-500 transition-colors" onClick={() => setMediaItems(prev => prev.filter((_, i) => i !== idx))}>
                     <X size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">No media uploaded yet.</p>
        )}
      </div>
    </div>
  );
};