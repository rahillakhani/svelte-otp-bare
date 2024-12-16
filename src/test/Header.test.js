import { render, fireEvent } from '@testing-library/svelte';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import Header from '../components/Header.svelte';

describe('Header Component', () => {
  it('renders the default title and subtitle', () => {
    const { getByText } = render(Header);

    // Check if the default title is rendered
    expect(getByText('Two-Factor Authentication')).toBeInTheDocument();

    // Check if the default subtitle is rendered
    expect(getByText('Enter the code sent to your email.')).toBeInTheDocument();
  });

  it('renders a custom title and subtitle', () => {
    const { getByText } = render(Header, {
      props: {
        title: 'Verify Your Identity',
        subtitle: 'Please enter the OTP we sent to your phone.',
      },
    });

    // Check if the custom title is rendered
    expect(getByText('Verify Your Identity')).toBeInTheDocument();

    // Check if the custom subtitle is rendered
    expect(getByText('Please enter the OTP we sent to your phone.')).toBeInTheDocument();
  });
});
