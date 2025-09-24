'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Shrink } from 'lucide-react';

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [handleFullscreenChange]);

  const toggleFullscreen = () => {
    const element = document.getElementById('dashboard');
    if (!element) return;

    if (!isFullscreen) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Button variant="outline" onClick={toggleFullscreen} className="w-32 hidden sm:flex">
      {isFullscreen ? (
        <>
          <Shrink className="mr-2 h-4 w-4" />
          Exit
        </>
      ) : (
        <>
          <Expand className="mr-2 h-4 w-4" />
          Fullscreen
        </>
      )}
    </Button>
  );
}
