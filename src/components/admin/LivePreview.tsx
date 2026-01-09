import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LivePreviewProps {
  children: React.ReactNode;
  className?: string;
}

const LivePreview = ({ children, className }: LivePreviewProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Prévia em Tempo Real
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="h-8 w-8 p-0"
          >
            {isVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      {isVisible && (
        <div 
          className={cn(
            "rounded-xl overflow-hidden border border-border bg-background transition-all duration-300",
            isExpanded ? "fixed inset-4 z-50" : "relative"
          )}
        >
          {isExpanded && (
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <Minimize2 className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
          )}
          <div className={cn(
            "overflow-auto",
            isExpanded ? "h-full" : "max-h-[500px]"
          )}>
            {children}
          </div>
        </div>
      )}

      {/* Backdrop for expanded mode */}
      {isExpanded && isVisible && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default LivePreview;
