/**
 * Shared between the booking form and its server action. Kept out of the
 * `"use server"` module because those may only export async functions.
 */
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const emptyEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
