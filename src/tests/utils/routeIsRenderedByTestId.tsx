import { render, waitFor, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@services/router/router';
import RoutePaths from '@utils/consts/RoutePaths';
import { test, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { applyUserSession } from '@tests/utils/userSession';
import Loader from '@components/ui/Loader/Loader';

const routeIsRenderedByTestId = ({
  route,
  testId,
  needAuth = false,
  testName = 'render',
}: {
  needAuth?: boolean;
  route: RoutePaths | string;
  testId: string;
  testName?: string;
}) => {
  test(`${testName} (${route}) with ${needAuth ? 'auth' : 'no auth'}`, async () => {
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
    render(<RenderElement />);

    await waitFor(() => screen.getByTestId(testId));
    expect(screen.getByTestId(testId)).toBeTruthy();
  });
};

export default routeIsRenderedByTestId;
