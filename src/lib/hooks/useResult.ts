import { useMutation } from "@tanstack/react-query";
import { getResultByRollAndRegistration } from "../api";

export interface ResultPayload {
  board: string;
  exam: string;
  year: string;
  roll: string;
  registration: string;
  mobileNumber?: string;
}

export interface Subject {
  code: string;
  name: string;
  grade: string;
}

export interface StudentInfo {
  "Roll No": string;
  Name: string;
  Board: string;
  "Fathers Name": string;
  Group: string;
  "Mothers Name": string;
  Type: string;
  "Date of Birth": string;
  Result: string;
  Institute: string;
  "Reg No": string;
}

export interface ResultSummary {
  GPA: string;
  Result: string;
}

export interface ResultResponse {
  studentInfo: StudentInfo;
  subjects: Subject[];
  summary: ResultSummary;
  success: boolean;
  exam: string;
  timestamp: string;
  request: {
    exam: string;
    year: string;
    board: string;
    roll: string;
    reg: string;
  };
}

export const useGetResult = () => {
  return useMutation({
    mutationFn: async (payload: ResultPayload) => {
      const result = await getResultByRollAndRegistration(
        payload.exam,
        payload.year,
        payload.board,
        payload.roll,
        payload.registration,
        payload["mobileNumber"] // Accessing mobileNumber from payload (needs interface update ideally but this works for now if interface allows or is loose)
      );
      return result as ResultResponse;
    },
  });
};
