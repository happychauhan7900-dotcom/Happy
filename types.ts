import React from 'react';

export interface GeneratedImage {
  id: string;
  url: string; // Base64 data URL
  prompt: string;
  type: 'original' | 'marketing' | 'edit';
  timestamp: number;
}

export interface MarketingPreset {
  id: string;
  label: string;
  promptTemplate: string;
  icon: React.ReactNode;
}