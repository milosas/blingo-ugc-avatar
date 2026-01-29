import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface ResultsActionsProps {
  onRegenerate: () => void;
  onNewUpload: () => void;
}

export function ResultsActions({ onRegenerate, onNewUpload }: ResultsActionsProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {/* Regenerate Button - Primary */}
      <Button
        variant="primary"
        onClick={onRegenerate}
        className="w-full sm:w-auto"
      >
        {t.actions.regenerate}
      </Button>

      {/* New Upload Button - Secondary */}
      <Button
        variant="secondary"
        onClick={onNewUpload}
        className="w-full sm:w-auto"
      >
        {t.actions.newUpload}
      </Button>
    </div>
  );
}
