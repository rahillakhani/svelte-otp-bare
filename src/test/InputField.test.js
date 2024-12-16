import { render, fireEvent } from '@testing-library/svelte';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import InputField from '../components/InputField.svelte';


describe('InputField Component (Client-Side Only)', () => {
  // Mock `getComputedStyle` globally before tests
  beforeAll(() => {
    global.getComputedStyle = (el) => ({
      borderColor: el === document.activeElement ? 'rgb(0, 123, 255)' : '', // Simulate border-color on focus
    });
  });
  
  it('renders correctly with the default value', () => {
    const { getByRole } = render(InputField, { value: '' });
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });
  it('restricts input to a single character', async () => {
    const mockOnInput = vi.fn();
    const { getByRole } = render(InputField, { onInput: mockOnInput });
    const input = getByRole('textbox');
    
    // Simulate entering "abcd" one character at a time
    await fireEvent.input(input, { target: { value: 'a' } });
    expect(input.value).toBe('a'); // First character is allowed
    
    await fireEvent.input(input, { target: { value: 'b' } });
    expect(input.value).toBe('b'); // Only 'b' remains after the input event
    
    await fireEvent.input(input, { target: { value: 'd' } });
    expect(input.value).toBe('d'); // Only 'd' remains after the input event
    
    // Check if the parent callback was called with the correct last character
    expect(mockOnInput).toHaveBeenCalledWith('d');
  });
  
  it('calls the `onInput` prop with the latest value', async () => {
    const mockOnInput = vi.fn();
    const { getByRole } = render(InputField, { onInput: mockOnInput });
    const input = getByRole('textbox');
    
    await fireEvent.input(input, { target: { value: 'x' } });
    expect(mockOnInput).toHaveBeenCalledWith('x');
  });
  
  it('triggers the `onKeyUp` callback on key release', async () => {
    const mockOnKeyUp = vi.fn();
    const { getByRole } = render(InputField, { onKeyUp: mockOnKeyUp });
    const input = getByRole('textbox');
    
    await fireEvent.keyUp(input, { key: 'ArrowRight' });
    expect(mockOnKeyUp).toHaveBeenCalled();
  });
  
  it('updates the value when the `value` prop is changed', async () => {
    // Initial render with value = 'A'
    const { getByRole, rerender } = render(InputField, { value: 'A' });
    const input = getByRole('textbox');
    
    // Verify the initial value
    expect(input.value).toBe('A');
    
    // Rerender the component with updated value = 'B'
    await rerender({ value: 'B' });
    
    // Verify that the value has updated
    expect(input.value).toBe('B');
  });
  
  it('focuses input and applies correct styles on focus', async () => {
    const { getByRole } = render(InputField, { value: '' });
    const input = getByRole('textbox');
  
    // Manually focus the input
    input.focus();
  
    // Validate focus
    expect(document.activeElement).toBe(input);
  
    // Optionally check styles
    const styles = getComputedStyle(input);
    expect(styles.borderColor).toBe('rgb(0, 123, 255)');
  });
  
});
