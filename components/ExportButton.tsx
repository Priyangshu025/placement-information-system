'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  filename: string;
  headers: string[];
  data: (string | number)[][];
  label?: string;
}

export default function ExportButton({
  filename,
  headers,
  data,
  label = 'Export CSV',
}: ExportButtonProps) {
  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...data.map((row) => row.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-colors"
    >
      <Download className="w-3.5 h-3.5 text-purple-300" />
      <span>{label}</span>
    </button>
  );
}

