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
        if (!Body)
          return null;

        return await Body.transformToString();
    }
    catch (err) {
        
        return null;
    }
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