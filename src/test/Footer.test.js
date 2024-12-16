import { render, fireEvent } from '@testing-library/svelte';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import Footer from '../components/Footer.svelte';

describe('Footer Component', () => {
  it('renders the footer text and resend link', () => {
    const { getByText } = render(Footer);
    
    // Check if the footer contains the expected text
    expect(getByText(/Didn’t receive a code\?/i)).toBeInTheDocument();
    
    // Check if the "Resend" link exists
    const resendLink = getByText('Resend');
    expect(resendLink).toBeInTheDocument();
    expect(resendLink.tagName).toBe('A'); // Ensure it's a link
    expect(resendLink).toHaveAttribute('href', '/retry');
  });

  it('calls the resendCode function when the "Resend" link is clicked', async () => {
    const { getByText } = render(Footer);

    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Find the "Resend" link
    const resendLink = getByText('Resend');

    // Simulate a click event
    await fireEvent.click(resendLink);

    // Verify that alert was called
    expect(alertMock).toHaveBeenCalledWith('A new code has been sent!');

    // Restore the original alert implementation
    alertMock.mockRestore();
  });
});
