// OLD CODE (commented out for reference):
// import React from "react";
// export default function CaptionDisplay({ caption, loading, error }) {
//   if (loading) return <p>Generating caption...</p>;
//   if (error) return <p className="text-red-600">{String(error)}</p>;
//   if (!caption) return null;
//   return (
//     <div className="mt-4 p-3 border rounded">
//       <p className="whitespace-pre-wrap">{caption}</p>
//     </div>
//   );
// }

// NEW CODE (production-level):
export default function CaptionDisplay({ caption, loading, error }) {
  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Generating caption...</span>
      </div>
    );
  }

  if (error) {
    return null; // Error is shown in Home.jsx
  }

  if (!caption) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h3 className="text-sm font-medium text-indigo-900 mb-2">Generated Caption:</h3>
      <p className="text-gray-800 whitespace-pre-wrap">{caption}</p>
    </div>
  );
}