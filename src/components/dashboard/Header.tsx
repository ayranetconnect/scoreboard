import { Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CurrentTime } from './CurrentTime';
import { FullscreenButton } from './FullscreenButton';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-20 sm:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Waves className="h-7 w-7 text-primary" />
        <h1 className="font-headline text-xl font-bold tracking-wider text-primary sm:text-2xl">
          WELOCITY.AI
        </h1>
      </div>
      <Badge
        variant="outline"
        className="ml-2 border-primary bg-primary/10 text-primary animate-pulse-opacity font-bold"
      >
        MARKET OPEN
      </Badge>
      <div className="ml-auto flex items-center gap-4">
        <CurrentTime />
        <FullscreenButton />
      </div>
    </header>
  );
}
