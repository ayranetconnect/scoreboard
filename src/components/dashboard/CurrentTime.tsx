'use client';

import { useEffect, useState } from 'react';

export function CurrentTime() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US'));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden text-right md:block">
      <div className="text-xs font-semibold uppercase text-muted-foreground">
        Current Time
      </div>
      <div className="font-mono text-lg font-bold text-primary">{time}</div>
    </div>
  );
}
