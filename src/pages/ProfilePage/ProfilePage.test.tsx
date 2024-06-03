import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoutePaths from '@utils/consts/RoutePaths';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@services/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { applyUserSession } from '@tests/utils/userSession';
import Loader from '@components/ui/Loader/Loader';

describe('ProfilePage', () => {
  //   const profileEditButtonId = 'profile-page-edit-profile-button';
  //   const profileEditSubmitButtonId = 'profile-page-edit-profile-submit-button';
  const route = RoutePaths.PROFILE;
  const needAuth = true;
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
          fallbackElement={<Loader />}
          router={router}
          future={{ v7_startTransition: true }}
        />
      </QueryClientProvider>
    );
  }

  it('renders ProfilePage component', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByText('Profile'));
    await waitFor(() => screen.getByText('Edit Profile'));
    await waitFor(() => screen.getByText('Edit Password'));
    expect(screen.getByText('Profile')).toBeDefined();
    expect(screen.getByText('Edit Profile')).toBeDefined();
    expect(screen.getByText('Edit Password')).toBeDefined();
  });

  it('editing fields', async () => {
    render(<RenderElement />);
    await waitFor(() => screen.getByPlaceholderText('Name*'));
    await waitFor(() => screen.getByPlaceholderText('Surname*'));
    await waitFor(() => screen.getByPlaceholderText('Email*'));

    const nameInput: HTMLInputElement = screen.getByPlaceholderText('Name*');
    const surnameInput: HTMLInputElement = screen.getByPlaceholderText('Surname*');
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email*');

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(surnameInput, { target: { value: 'TestSurname' } });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });

    expect(nameInput.value).toBe('Test');
    expect(surnameInput.value).toBe('TestSurname');
    expect(emailInput.value).toBe('test@gmail.com');
  });

  //   it('displays error message for invalid format', async () => {
  //     render(<RenderElement />);
  //     await waitFor(() => screen.getByTestId(profileEditButtonId));
  //     const editButton = screen.getByTestId(profileEditButtonId);
  //     fireEvent.click(editButton);
  //     await waitFor(() => screen.getByTestId(profileEditSubmitButtonId));
  //     const submitButton = screen.getByTestId(profileEditSubmitButtonId);

  //     await waitFor(() => screen.getByPlaceholderText('Name*'));
  //     await waitFor(() => screen.getByPlaceholderText('Surname*'));
  //     await waitFor(() => screen.getByPlaceholderText('Email*'));

  //     const nameInput: HTMLInputElement = screen.getByPlaceholderText('Name*');
  //     const surnameInput: HTMLInputElement = screen.getByPlaceholderText('Surname*');
  //     const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email*');

  //     fireEvent.change(nameInput, { target: { value: 'test' } });
  //     fireEvent.change(surnameInput, { target: { value: 'testSurname' } });
  //     fireEvent.change(emailInput, { target: { value: 'test@gmail' } });
  //     fireEvent.click(submitButton);

  //     const errorMessageEmail = await screen.findByText('Invalid email');
  //     const errorMessageNames = await screen.findByText(
  //       'Name must start with an uppercase (contain only letters)'
  //     );

  //     expect(errorMessageEmail).toBeDefined();
  //     expect(errorMessageNames).toBeDefined();
  //   });

  //   it('displays error message for invalid password format', async () => {
  //     render(<RenderElement />);
  //     await waitFor(() => screen.getByPlaceholderText('Password*'));
  //     await waitFor(() => screen.getByTestId(loginButtonId));
  //     const passwordInput = screen.getByPlaceholderText('Password*');
  //     const submitButton = screen.getByTestId(loginButtonId);

  //     fireEvent.change(passwordInput, { target: { value: 'password' } });
  //     fireEvent.click(submitButton);
  //     const errorMessage = await screen.findByText(
  //       'Password must contain at least one uppercase letter'
  //     );

  //     expect(errorMessage).toBeDefined();
  //   });
});
