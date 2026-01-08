import { encryptData, decryptData } from "./crypto";

// get result by roll & registration
export async function getResultByRollAndRegistration(
  exam: string,
  year: string,
  board: string,
  roll: string,
  reg: string,
  mobileNumber?: string // Optional mobile number
) {
  try {
    // Prepare the payload
    const payload = {
      exam,
      year,
      board,
      roll,
      reg,
      mobileNumber,
    };

    // Encrypt the payload
    const encryptedPayload = encryptData(payload);

    // Call the local Next.js API route with POST method
    const res = await fetch("/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encryptedPayload,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch result");
    }

    const responseData = await res.json();

    // Decrypt the response
    const decryptedData = decryptData(responseData.encryptedData);

    return decryptedData;
  } catch (err) {
    console.error("Error fetching result:", err);
    throw new Error("Failed to fetch result by roll and registration");
  }
}
