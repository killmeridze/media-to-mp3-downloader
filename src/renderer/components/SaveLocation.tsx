import React from "react";

interface SaveLocationProps {
  savePath: string;
  handleDirectorySelect: () => void;
}

const SaveLocation: React.FC<SaveLocationProps> = ({
  savePath,
  handleDirectorySelect,
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-200">Save Location</label>
    <div className="flex gap-2">
      <input
        type="text"
        readOnly
        value={savePath}
        placeholder="Choose save location..."
        className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 cursor-not-allowed"
      />
      <button
        onClick={handleDirectorySelect}
        className="bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-white/10"
      >
        Browse
      </button>
    </div>
  </div>
);

export default SaveLocation;
