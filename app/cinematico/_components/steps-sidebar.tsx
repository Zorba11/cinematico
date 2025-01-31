import { cn } from '@/lib/utils';
import Link from 'next/link';

const steps = [
  { id: 1, title: 'Story Setup', icon: '📝' },
  { id: 2, title: 'Character Design', icon: '👤' },
  { id: 3, title: 'Scene Planning', icon: '🎬' },
  { id: 4, title: 'Visual Style', icon: '🎨' },
  { id: 5, title: 'AI Generation', icon: '🤖' },
  { id: 6, title: 'Sound Design', icon: '🎵' },
  { id: 7, title: 'Special Effects', icon: '✨' },
  { id: 8, title: 'Final Edit', icon: '✂️' },
  { id: 9, title: 'Premiere', icon: '🎥' },
];

interface StepsSidebarProps {
  currentStep?: number;
}

export function StepsSidebar({ currentStep = 1 }: StepsSidebarProps) {
  return (
    <div className="w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r min-h-screen p-4">
      <nav className="space-y-4">
        {steps.map((step) => (
          <Link
            key={step.id}
            href={`/cinematico/step/${step.id}`}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
              currentStep === step.id
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted'
            )}
          >
            <span className="text-xl">{step.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Step {step.id}
              </span>
              <span className="font-medium">{step.title}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
