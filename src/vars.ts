// read from profile
// import { fromIni } from '@aws-sdk/credential-provider-ini';

export const AWS_REGION = 'eu-central-1';
export const AWS_PROFILE = import.meta.env.AWS_PROFILE! || 'default';
// export const credentials = fromIni({ profile: AWS_PROFILE });

export const credentials = {
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
};
