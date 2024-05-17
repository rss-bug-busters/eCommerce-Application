import fetch from 'cross-fetch';
import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { apiUrl } from '@services/api/client/options/credential';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  includeResponseHeaders: true,
  maskSensitiveHeaderData: true,
  includeOriginalRequest: false,
  includeRequestInErrorResponse: false,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [503],
  },
  fetch,
};

export default httpMiddlewareOptions;
