import { NextResponse } from "next/server";
import { decryptData, encryptData } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { encryptedPayload } = body;

    if (!encryptedPayload) {
      return NextResponse.json(
        { error: "Missing encrypted payload" },
        { status: 400 }
      );
    }

    // Decrypt the payload
    const decryptedData = decryptData(encryptedPayload);

    // Forward to the secondary server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create/results`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decryptedData),
      }
    );

    if (!response.ok) {
      console.error("Secondary server responded with error:", response.status);
      return NextResponse.json(
        // { error: "Failed to forward data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Encrypt the response
    const encryptedResponse = encryptData(data);

    return NextResponse.json({ encryptedData: encryptedResponse });
  } catch (error) {
    console.error("Error in proxy route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
