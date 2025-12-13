import { S3Client } from "@aws-sdk/client-s3";

export function createR2Client() {
  return new S3Client({
    region: "auto", // R2 ignores region
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_ID!,
      secretAccessKey: process.env.R2_ACCESS_KEY!,
    },
  });
}
