import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { AuthResult } from '../../../auth/getAuth';
import { getEnvValue } from '../../../utils/getEnvValue';
import type { ActionResult } from '../../types';

export const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  };
};

export const createErrorResult = (code: string, message: string): ActionResult<never> => {
  return { ok: false, code, message };
};

export const createS3Client = () => {
  return new S3Client({
    region: getEnvValue('OCI_REGION'),
    endpoint: getEnvValue('OCI_ENDPOINT'),
    credentials: {
      accessKeyId: getEnvValue('OCI_ACCESS_KEY'),
      secretAccessKey: getEnvValue('OCI_SECRET_KEY'),
    },
    forcePathStyle: true,
  });
};

export const createImageSignedUrl = async (storagePath: string, expiresInSeconds = 300) => {
  const s3 = createS3Client();

  return getSignedUrl(
    // The AWS packages currently resolve two compatible but separately typed
    // @smithy/types versions. The presigner and S3 client use the same runtime
    // client; this cast only bridges that dependency typing mismatch.
    s3 as unknown as Parameters<typeof getSignedUrl>[0],
    new GetObjectCommand({
      Bucket: getEnvValue('OCI_BUCKET_NAME'),
      Key: storagePath,
    }) as unknown as Parameters<typeof getSignedUrl>[1],
    { expiresIn: expiresInSeconds },
  );
};
