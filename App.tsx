import React, { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { GeneratedGallery } from './components/GeneratedGallery';
import { PromptEditor } from './components/PromptEditor';
import { GeneratedImage, MarketingPreset } from './types';
import { generateImageFromProduct } from './services/geminiService';
import { ShirtIcon, MugIcon, BillboardIcon, LoaderIcon, EditIcon, UploadIcon } from './components/Icons';

const MARKETING_PRESETS: MarketingPreset[] = [
  {
    id: 'mug',
    label: 'Coffee Mug',
    promptTemplate: 'A realistic, high-quality product photography shot of this image printed on a classic white ceramic coffee mug sitting on a wooden table in a cozy cafe. The product design is clear and centered.',
    icon: <MugIcon />,
  },
  {
    id: 'tshirt',
    label: 'T-Shirt',
    promptTemplate: 'A realistic fashion photo of a person wearing a high-quality white cotton t-shirt with this image printed on the chest. The lighting is studio quality.',
    icon: <ShirtIcon />,
  },
  {
    id: 'billboard',
    label: 'Billboard',
    promptTemplate: 'A wide shot of a large outdoor city billboard in Times Square displaying this image as a high-end advertisement. Realistic urban lighting.',
    icon: <BillboardIcon />,
  },
];

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<GeneratedImage | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = useCallback((base64: string) => {
    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      url: base64,
      prompt: 'Original Image',
      type: 'original',
      timestamp: Date.now(),
    };
    setOriginalImage(newImage);
    setSelectedImage(newImage);
    setGeneratedImages([]); // Reset gallery on new upload
    setError(null);
  }, []);

  const handleGenerate = async (prompt: string, type: 'marketing' | 'edit' = 'edit') => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use the selected image as the source. 
      // If consistency is key, users might prefer always using the ORIGINAL, 
      // but editing a generated image allows for iterative workflows.
      // We will use the selected image.
      
      const resultBase64 = await generateImageFromProduct(selectedImage.url, prompt);

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: resultBase64,
        prompt: prompt,
        type: type,
        timestamp: Date.now(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setSelectedImage(newImage); // Auto-select the new result

    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (preset: MarketingPreset) => {
    if (!originalImage) return;
    // For marketing presets, we usually want to go back to the source "logo" or "product" image
    // to place it on merchandise, rather than iterating on an iteration.
    // However, if the user explicitly selected a generated image, maybe they want that one?
    // Let's stick to the currently selected image for maximum flexibility.
    handleGenerate(preset.promptTemplate, 'marketing');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <EditIcon />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Product Visualizer AI
            </h1>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Powered by Gemini 2.5
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section: Upload and Current Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Col: Upload & Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">1. Upload Product</h2>
              <ImageUpload onImageSelected={handleImageSelected} />
              
              {originalImage && (
                 <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                      onClick={() => setSelectedImage(originalImage)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                        ${selectedImage?.id === originalImage.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={originalImage.url} className="w-full h-full object-cover" alt="Original" />
                    </button>
                    {/* Tiny preview thumbnails of recent gens */}
                    {generatedImages.slice(0, 4).map(img => (
                       <button
                       key={img.id}
                       onClick={() => setSelectedImage(img)}
                       className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                         ${selectedImage?.id === img.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 opacity-60 hover:opacity-100'}`}
                     >
                       <img src={img.url} className="w-full h-full object-cover" alt="Thumb" />
                     </button>
                    ))}
                 </div>
              )}
            </div>

            {/* Controls for Marketing Presets */}
            <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-500 ${!originalImage ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">2. Generate Assets</h2>
              <p className="text-slate-500 text-sm mb-4">Visualize the selected image on products.</p>
              
              <div className="grid grid-cols-3 gap-3">
                {MARKETING_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    disabled={isLoading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-slate-400 group-hover:text-indigo-600 mb-2 transition-colors">
                      {preset.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Main Preview & Editor */}
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h2 className="text-lg font-semibold text-slate-800">Preview Workspace</h2>
                   {selectedImage && (
                     <span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-mono">
                        {selectedImage.type === 'original' ? 'ORIGINAL' : selectedImage.type.toUpperCase()}
                     </span>
                   )}
                </div>
                
                <div className="flex-1 bg-slate-50 relative flex items-center justify-center p-8">
                  {isLoading && (
                    <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                       <div className="text-indigo-600 animate-spin mb-4">
                         <LoaderIcon />
                       </div>
                       <p className="text-slate-600 font-medium animate-pulse">Generating your visual...</p>
                       <p className="text-slate-400 text-sm mt-2">This may take a few seconds</p>
                    </div>
                  )}

                  {!selectedImage ? (
                    <div className="text-center text-slate-400">
                      <div className="w-16 h-16 mx-auto mb-4 text-slate-300">
                        <UploadIcon />
                      </div>
                      <p>Upload an image to get started</p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                       <img 
                        src={selectedImage.url} 
                        alt="Selected" 
                        className="max-w-full max-h-[500px] object-contain shadow-2xl rounded-lg"
                       />
                       {/* Floating prompt overlay if generated */}
                       {selectedImage.type !== 'original' && (
                         <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white p-3 rounded-lg text-sm">
                            <span className="opacity-70 text-xs uppercase tracking-wider block mb-1">Prompt</span>
                            {selectedImage.prompt}
                         </div>
                       )}
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="bg-red-50 p-4 border-t border-red-100 text-red-600 text-sm">
                    {error}
                  </div>
                )}
             </div>

             <PromptEditor 
               onGenerate={(prompt) => handleGenerate(prompt, 'edit')}
               isLoading={isLoading}
               selectedImageHasValue={!!selectedImage}
             />
          </div>

        </div>

        {/* Bottom Section: Gallery */}
        <GeneratedGallery 
          images={generatedImages}
          onSelectImage={setSelectedImage}
          selectedImageId={selectedImage?.id || null}
        />
      </main>
    </div>
  );
};

export default App;