import { QueryClient } from '@tanstack/react-query';

interface BuildClientOptions {
  needAnonymousAuth?: boolean;
  queryClient?: QueryClient;
  user?: { password: string; username: string };
}

export default BuildClientOptions;
