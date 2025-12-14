import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "./r2client";
import { r2Track } from "../types/r2_types";

export async function getR2Object(bucket : string, key : string) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    })

    try {
        const {Body} = await r2Client.send(command);
        if (Body) {
            const text = await streamToString(Body);
            return text;
        }
    }
    catch (err) {
        console.error("error getting the r2 obj", err);
        return null;
    }
}

async function streamToString(stream: any): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const result = await reader.read();
    done = result.done ?? true;
    if (result.value) chunks.push(result.value);
  }

  const totalLength = chunks.reduce((sum, arr) => sum + arr.length, 0);
  const mergedArray = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    mergedArray.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(mergedArray);
}

export async function uploadR2Object(
  bucket: string,
  key: string,
  tracks: r2Track[]
) {
  

  const data = JSON.stringify(tracks, null, 2); 

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: data,
    ContentType: "application/json",
  });

  try {
    await r2Client.send(command);
    
  } catch (err) {
    console.error("Error uploading to R2:", err);
    throw err;
  }
}