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
      return isVertical ? 'grid-cols-2' : 'grid-cols-4';
    };

    const getGapSize = () => {
      const size = getDialSize();
      return size === 'sm' ? 'gap-2' : size === 'md' ? 'gap-3' : 'gap-4';
    };

    return (
      <div
        className={`grid ${getGridCols()} ${getGapSize()} justify-items-center`}
      >
        {[
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
        ].map(({ label, icon, step, handler }) => (
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
    );
  }
);
