'use client';
import React from 'react';
import ShowroomLoader from '@/components/ShowroomLoader';

export default function Loading() {
  return (
    <ShowroomLoader
      text="CAR EASE SHOWROOM..."
      subtext="Preparing Telemetry & Inventory"
      fullScreen={true}
    />
  );
}
