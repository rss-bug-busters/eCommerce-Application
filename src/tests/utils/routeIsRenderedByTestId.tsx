import { render, waitFor, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@services/router/router';
import RoutePaths from '@utils/consts/RoutePaths';
import { test, expect } from 'vitest';

const routeIsRenderedByTestId = ({
  route,
  testName,
  testId,
}: {
  route: RoutePaths | string;
  testId: string;
  testName: string;
}) => {
  test(`${testName} (${route})`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePaths.MAIN, route],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId(testId));
    expect(screen.getByTestId(testId));
  });
};

export default routeIsRenderedByTestId;
