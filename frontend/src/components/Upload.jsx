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

  const generateCaption = (imageData) => {
    setIsLoading(true);
    // Simulate API call to generate caption
    setTimeout(() => {
      const newCaption = 'A beautiful landscape with mountains and a lake. (Simulated)';
      setCaption(newCaption);
      setEditedCaption(newCaption);
      setIsLoading(false);
    }, 1500);
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
    <div id="caption" className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Captions
      </h2>

      <div 
        className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
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
            <p className="mt-2 text-sm text-gray-600">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* Caption Display/Edit Area */}
      {caption && !isLoading && !isEditing && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-lg text-gray-800">{caption}</p>
        </div>
      )}

      {isEditing && (
        <div className="mt-6">
          <textarea
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            className= " text-black w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
      )}

      {isLoading && (
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">Generating caption...</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRegenerate}
              disabled={!image || isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Regenerate
            </button>
            <button
              onClick={handleEdit}
              disabled={!caption || isLoading}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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