import { useState, useRef } from 'react';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        generateCaption(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCaption = async (imageData) => {
    setIsLoading(true);
    
    try {
      // Convert base64 data URL back to file
      const response = await fetch(imageData);
      const blob = await response.blob();
      
      // Create FormData with the image file
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');
      
      // Send to your backend
      const apiResponse = await fetch('http://localhost:8000/caption-image/', {
        method: 'POST',
        body: formData,
      });
      
      if (!apiResponse.ok) {
        throw new Error('Failed to get image description');
      }
      
      const data = await apiResponse.json();
      setCaption(data.caption);
      setEditedCaption(data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
      setCaption('Error generating caption. Please try again.');
      setEditedCaption('Error generating caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (image) {
      generateCaption(image);
    }
  };

  const handleEdit = () => {
    setEditedCaption(caption);
    setIsEditing(true);
  };

  const handleSave = () => {
    setCaption(editedCaption);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div id="caption" className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Smart <span className="text-yellow-400">Captions</span>
        </h2>
        <p className="text-gray-300 text-lg">Upload an image and get trendy Gen Z-style captions!</p>
      </div>

      <div 
        className="w-full h-64 border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center text-center bg-white/10 backdrop-blur-md hover:bg-white/15 cursor-pointer transition-colors"
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        {image ? (
          <img src={image} alt="Uploaded preview" className="max-h-full max-w-full rounded-lg" />
        ) : (
          <div>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm text-gray-300">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* Caption Display/Edit Area */}
      {caption && !isLoading && !isEditing && (
        <div className="mt-6 p-6 bg-yellow-400/20 border border-yellow-400/30 rounded-xl text-center">
          <p className="text-lg text-white">{caption}</p>
        </div>
      )}

      {isEditing && (
        <div className="mt-6">
          <textarea
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            className="text-white w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 placeholder-gray-400"
            rows="3"
          />
        </div>
      )}

      {isLoading && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mb-3"></div>
          <p className="text-lg text-gray-300">Generating caption...</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-colors font-medium border border-white/20"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRegenerate}
              disabled={!image || isLoading}
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Regenerate
            </button>
            <button
              onClick={handleEdit}
              disabled={!caption || isLoading}
              className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium border border-white/20"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;