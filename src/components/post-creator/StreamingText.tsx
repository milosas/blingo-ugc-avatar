interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  placeholder?: string;
}

export function StreamingText({ text, isStreaming, placeholder }: StreamingTextProps) {
  if (!text && !isStreaming) {
    return (
      <div className="bg-[#F7F7F5] rounded-xl p-6 text-center text-sm text-[#999]">
        {placeholder || 'Sugeneruotas tekstas bus rodomas čia...'}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E5E3] rounded-xl p-6">
      <div className="whitespace-pre-wrap text-[#1A1A1A] text-sm leading-relaxed">
        {text}
        {isStreaming && (
          <span className="inline-block w-0.5 h-4 bg-[#FF6B35] ml-0.5 animate-pulse align-text-bottom" />
        )}
      </div>
    </div>
  );
}
