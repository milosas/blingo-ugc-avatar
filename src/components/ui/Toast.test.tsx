import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast, type ToastData } from './Toast';

function makeToast(overrides: Partial<ToastData> = {}): ToastData {
  return {
    id: 'test-1',
    message: 'Test message',
    type: 'success',
    ...overrides,
  };
}

describe('Toast', () => {
  it('renders the toast message', () => {
    render(<Toast toast={makeToast()} onDismiss={vi.fn()} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies success styles', () => {
    const { container } = render(
      <Toast toast={makeToast({ type: 'success' })} onDismiss={vi.fn()} />
    );
    const toastEl = container.firstChild as HTMLElement;
    expect(toastEl.className).toContain('bg-[#10B981]');
  });

  it('applies error styles', () => {
    const { container } = render(
      <Toast toast={makeToast({ type: 'error' })} onDismiss={vi.fn()} />
    );
    const toastEl = container.firstChild as HTMLElement;
    expect(toastEl.className).toContain('bg-red-500');
  });

  it('applies info styles', () => {
    const { container } = render(
      <Toast toast={makeToast({ type: 'info' })} onDismiss={vi.fn()} />
    );
    const toastEl = container.firstChild as HTMLElement;
    expect(toastEl.className).toContain('bg-blue-500');
  });

  it('has a close button', () => {
    render(<Toast toast={makeToast()} onDismiss={vi.fn()} />);
    expect(screen.getByLabelText('Uždaryti')).toBeInTheDocument();
  });
});
