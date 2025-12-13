import { createR2Client } from "@/lib/r2/r2client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const r2Client =  createR2Client();

    await r2Client.send(new PutObjectCommand({
        Bucket: '',
        Key: "recently-played/user123.json",
        Body: JSON.stringify({ track: "song" }),
        ContentType: "application/json",
    }));

    return NextResponse.json({st: "hi"})
}