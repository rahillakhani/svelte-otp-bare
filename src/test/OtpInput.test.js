import { render, fireEvent } from '@testing-library/svelte';
import OtpInput from '../src/components/OtpInput.svelte';

describe('OtpInput Component', () => {
  test('focus moves to the next field on input', async () => {
    const { getAllByRole } = render(OtpInput, { length: 4 });
    const inputs = getAllByRole('textbox');

    await fireEvent.input(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  test('onComplete is called with correct OTP', async () => {
    const mockCallback = jest.fn();
    const { getAllByRole } = render(OtpInput, { length: 4, onComplete: mockCallback });
    const inputs = getAllByRole('textbox');

    await fireEvent.input(inputs[0], { target: { value: '1' } });
    await fireEvent.input(inputs[1], { target: { value: '2' } });
    await fireEvent.input(inputs[2], { target: { value: '3' } });
    await fireEvent.input(inputs[3], { target: { value: '4' } });

    expect(mockCallback).toHaveBeenCalledWith('1234');
  });
});
