import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoutePaths from '@utils/consts/RoutePaths';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@services/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { applyUserSession } from '@tests/utils/userSession';

describe('LoginPage', () => {
  const loginButtonId = 'login-page-submit-button';
  const route = RoutePaths.LOGIN;
  const needAuth = false;
  const router = createMemoryRouter(routes, {
    initialEntries: [RoutePaths.MAIN, route],
    initialIndex: 1,
  });

  function RenderElement() {
    const queryClient = new QueryClient();

    applyUserSession(needAuth ? 'password' : 'anonymous');

    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          fallbackElement={<h1>Loading....</h1>}
          router={router}
          future={{ v7_startTransition: true }}
        />
      </QueryClientProvider>
    );
  }

  it('renders LoginPage component', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByPlaceholderText('Email*'));
    await waitFor(() => screen.getByPlaceholderText('Password*'));
    expect(screen.getByPlaceholderText('Email*')).toBeDefined();
    expect(screen.getByPlaceholderText('Password*')).toBeDefined();
  });

  it('allows entering email and password', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByPlaceholderText('Email*'));
    await waitFor(() => screen.getByPlaceholderText('Password*'));
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email*');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Password*');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  it('displays error message for invalid email format', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByPlaceholderText('Email*'));
    await waitFor(() => screen.getByTestId(loginButtonId));
    const emailInput = screen.getByPlaceholderText('Email*');
    const submitButton = screen.getByTestId(loginButtonId);

    fireEvent.change(emailInput, { target: { value: 'test@example' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Invalid email');

    expect(errorMessage).toBeDefined();
  });

  it('displays error message for invalid password format', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByPlaceholderText('Password*'));
    await waitFor(() => screen.getByTestId(loginButtonId));
    const passwordInput = screen.getByPlaceholderText('Password*');
    const submitButton = screen.getByTestId(loginButtonId);

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText(
      'Password must contain at least one uppercase letter'
    );

    expect(errorMessage).toBeDefined();
  });
});
