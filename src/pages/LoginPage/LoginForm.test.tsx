import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoutePaths from '@utils/consts/RoutePaths';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@services/router/router';

describe('LoginForm', () => {
  const route = RoutePaths.LOGIN;
  const router = createMemoryRouter(routes, {
    initialEntries: [RoutePaths.MAIN, route],
    initialIndex: 1,
  });

  it('renders LoginForm component', async () => {
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.getByPlaceholderText('Email*'));
    expect(screen.getByPlaceholderText('Email*')).toBeDefined();
    expect(screen.getByPlaceholderText('Password*')).toBeDefined();
  });

  it('allows entering email and password', () => {
    render(<RouterProvider router={router} />);
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email*');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Password*');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  it('displays error message for invalid email format', async () => {
    render(<RouterProvider router={router} />);
    const emailInput = screen.getByPlaceholderText('Email*');
    const submitButton = screen.getByTestId('login-page-submit-button');

    fireEvent.change(emailInput, { target: { value: 'test@example' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Invalid email');

    expect(errorMessage).toBeDefined();
  });

  it('displays error message for invalid password format', async () => {
    render(<RouterProvider router={router} />);
    const passwordInput = screen.getByPlaceholderText('Password*');
    const submitButton = screen.getByTestId('login-page-submit-button');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText(
      'Password must contain at least one uppercase letter'
    );

    expect(errorMessage).toBeDefined();
  });
});
