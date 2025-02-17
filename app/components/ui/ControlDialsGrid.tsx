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
        label: 'IDEA',
        icon: LightBulbIcon,
        step: 'idea',
        handler: 'handleIdeaClick',
      },
      {
        label: 'CHARACTER',
        icon: UserIcon,
        step: 'character',
        handler: 'handleCharacterClick',
      },
      {
        label: 'STORY',
        icon: DocumentTextIcon,
        step: 'story',
        handler: 'handleStoryClick',
      },
      {
        label: 'SCRIPT',
        icon: DocumentIcon,
        step: 'script',
        handler: 'handleScriptClick',
      },
      {
        label: 'STORYBOARD',
        icon: PhotoIcon,
        step: 'storyboard',
        handler: 'handleStoryboardClick',
      },
      {
        label: 'MUSIC',
        icon: MusicalNoteIcon,
        step: 'music',
        handler: 'handleMusicClick',
      },
      {
        label: 'VOICE',
        icon: ChatBubbleLeftRightIcon,
        step: 'voice',
        handler: 'handleVoiceClick',
      },
      {
        label: 'RENDER',
        icon: FilmIcon,
        step: 'render',
        handler: 'handleRenderClick',
      },
      {
        label: 'FINISH',
        icon: CheckCircleIcon,
        step: 'finish',
        handler: 'handleFinishClick',
      },
    ];

    const zeroShotButton = [
      {
        label: 'CREATE IN ZERO SHOT',
        icon: SparklesIcon,
        step: 'zeroshot',
        handler: 'createShot',
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
            />
          ))}
        </div>
      </div>
    );
  }
);
