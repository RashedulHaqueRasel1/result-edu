import { NextResponse } from "next/server";
import { decryptData, encryptData } from "@/lib/crypto";

interface ResultPayload {
  exam: string;
  year: string;
  board: string;
  roll: string;
  reg: string;
  mobileNumber?: string;
}

export async function POST(req: Request) {
  try {
    // Parse the encrypted request body
    const body = await req.json();
    const { encryptedPayload } = body;

    if (!encryptedPayload) {
      return NextResponse.json(
        { error: "Missing encrypted payload" },
        { status: 400 }
      );
    }

    // Decrypt the payload
    const decryptedPayload = decryptData(encryptedPayload) as ResultPayload;

    // Type guard for the decrypted payload
    if (
      typeof decryptedPayload !== "object" ||
      decryptedPayload === null ||
      !("exam" in decryptedPayload) ||
      !("year" in decryptedPayload) ||
      !("board" in decryptedPayload) ||
      !("roll" in decryptedPayload) ||
      !("reg" in decryptedPayload)
    ) {
      return NextResponse.json(
        { error: "Invalid payload format" },
        { status: 400 }
      );
    }

    const { exam, year, board, roll, reg, mobileNumber } = decryptedPayload;

    // Validate required parameters
    if (!exam || !year || !board || !roll || !reg) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Construct the external API URL
    const url = `${process.env.NEXT_PUBLIC_API_URL}/?exam=${exam}&year=${year}&board=${board}&roll=${roll}&reg=${reg}`;

    // Fetch from the external API
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: `${process.env.NEXT_PUBLIC_REFERER}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from external API" },
        { status: res.status }
      );
    }

    const data = await res.text();
    let parsedData;
    try {
        parsedData = JSON.parse(data);
    } catch (e) {
        console.error("Failed to parse result data for saving:", e);
    }

    // If result is successful, save to backend
    if (parsedData && parsedData.success && process.env.NEXT_PUBLIC_BACKEND) {
        try {
            const fullPayload = {
               ...parsedData, // The result object itself
               request: { exam, year, board, roll, reg },
               mobileNumber: mobileNumber
            };

            const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND}/create/results`;
             // Using fetch for server-side call, effectively hiding it from client
            await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fullPayload),
            });
            // We silent fail/log on saving error to not disrupt user experience
        } catch (saveError) {
             console.error("Failed to save result to backend server-side:", saveError);
        }
    }

    // Encrypt the response before sending
    const encryptedResponse = encryptData(data);

    // Return the encrypted response
    return NextResponse.json({
      encryptedData: encryptedResponse,
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
