import { Button } from '../ui/Button';
import { UI_TEXT } from '../../constants/ui';

interface ResultsActionsProps {
  onRegenerate: () => void;
  onNewUpload: () => void;
}

export function ResultsActions({ onRegenerate, onNewUpload }: ResultsActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {/* Regenerate Button - Primary */}
      <Button
        variant="primary"
        onClick={onRegenerate}
        className="w-full sm:w-auto"
      >
        {UI_TEXT.actions.regenerate}
      </Button>

      {/* New Upload Button - Secondary */}
      <Button
        variant="secondary"
        onClick={onNewUpload}
        className="w-full sm:w-auto"
      >
        {UI_TEXT.actions.newUpload}
      </Button>
    </div>
  );
}
