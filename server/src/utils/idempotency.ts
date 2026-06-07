type CacheEntry = {
  createdAt: number;
  payloadHash: string;
  responseBody: unknown;
};

const idempotencyCache = new Map<string, CacheEntry>();

export function readIdempotencyKey(
  organizationId: string,
  route: string,
  key?: string,
): string | null {
  if (!key) {
    return null;
  }

  return `${organizationId}:${route}:${key}`;
}

export function getIdempotentResponse(
  cacheKey: string,
  payloadHash: string,
): unknown | null {
  const existing = idempotencyCache.get(cacheKey);
  if (!existing || existing.payloadHash !== payloadHash) {
    return null;
  }

  return existing.responseBody;
}

export function setIdempotentResponse(
  cacheKey: string,
  payloadHash: string,
  responseBody: unknown,
): void {
  idempotencyCache.set(cacheKey, {
    createdAt: Date.now(),
    payloadHash,
    responseBody,
  });
}
