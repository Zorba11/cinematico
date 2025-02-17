import { observer } from 'mobx-react-lite';
import { ControlDial } from './ControlDial';
import {
  LightBulbIcon,
  UserIcon,
  DocumentTextIcon,
  DocumentIcon,
  PhotoIcon,
  MusicalNoteIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  FilmIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { MovieStore } from '@/stores/MovieStore';

interface ControlDialsGridProps {
  movieStore: MovieStore;
  isVertical: boolean;
}

type MovieStoreHandlers = {
  [K in keyof MovieStore]: MovieStore[K] extends Function ? K : never;
}[keyof MovieStore];

export const ControlDialsGrid = observer(
  ({ movieStore, isVertical }: ControlDialsGridProps) => {
    const getDialSize = () => {
      return isVertical ? 'sm' : 'md';
    };

    const getGridCols = () => {
      if (movieStore.isZeroShotMode) {
        return 'grid-cols-1';
      }
      return isVertical
        ? 'grid-cols-2'
        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    };

    const getGapSize = () => {
      return 'gap-2 sm:gap-3 md:gap-4';
    };

    const regularModeButtons = [
      {
        label: 'Actors',
        icon: UserIcon,
        step: 'actors',
        handler: 'handleActorsClick' as MovieStoreHandlers,
      },
      {
        label: 'IDEA',
        icon: LightBulbIcon,
        step: 'idea',
        handler: 'handleIdeaClick' as MovieStoreHandlers,
      },
      {
        label: 'SCRIPT',
        icon: DocumentTextIcon,
        step: 'script',
        handler: 'handleScriptClick' as MovieStoreHandlers,
      },
      {
        label: 'FRAMES',
        icon: PhotoIcon,
        step: 'frames',
        handler: 'handleFramesClick' as MovieStoreHandlers,
      },
      {
        label: 'MUSIC',
        icon: MusicalNoteIcon,
        step: 'music',
        handler: 'handleMusicClick' as MovieStoreHandlers,
      },
      {
        label: 'DIALOGUES',
        icon: ChatBubbleLeftRightIcon,
        step: 'dialogues',
        handler: 'handleDialoguesClick' as MovieStoreHandlers,
      },
      {
        label: 'SHOTS',
        icon: FilmIcon,
        step: 'shots',
        handler: 'handleShotsClick' as MovieStoreHandlers,
      },
      {
        label: 'RENDER',
        icon: CheckCircleIcon,
        step: 'render',
        handler: 'handleRenderClick' as MovieStoreHandlers,
      },
    ] as const;

    const zeroShotButton = [
      {
        label: 'CREATE IN ZERO SHOT',
        icon: SparklesIcon,
        step: 'zeroshot',
        handler: 'createShot' as MovieStoreHandlers,
      },
    ];

    const buttons = movieStore.isZeroShotMode
      ? zeroShotButton
      : regularModeButtons;

    return (
      <div
        className={`h-full flex ${
          movieStore.isZeroShotMode ? 'items-center justify-center' : ''
        }`}
      >
        <div
          className={`grid ${getGridCols()} ${getGapSize()} justify-items-center ${
            movieStore.isZeroShotMode ? 'w-fit' : 'w-full'
          }`}
        >
          {buttons.map(({ label, icon, step, handler }) => (
            <ControlDial
              key={label}
              label={label}
              icon={icon}
              onClick={() => movieStore[handler]()}
              isActive={movieStore.currentStep === step}
              size={getDialSize()}
              disabled={!movieStore.isPowerOn}
            />
          ))}
        </div>
      </div>
    );
  }
);
