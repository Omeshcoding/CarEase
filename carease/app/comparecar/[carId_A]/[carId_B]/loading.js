'use client';
import React from 'react';
import ShowroomLoader from '@/components/ShowroomLoader';

export default function Loading() {
  return (
    <ShowroomLoader
      text="CALIBRATING MATCHUP..."
      subtext="Loading High-Resolution Renders & Telemetry"
      fullScreen={true}
    />
  );
}
