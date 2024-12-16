import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Component from '../components/InputField.svelte';

test('Component', async () => {
	const user = userEvent.setup();
	render(Component);

	const inputfield = screen.getByRole('input');
	expect(inputfield).toHaveTextContent(0);

	await user.type("text")
	expect(inputfield).toHaveTextContent("text");
});