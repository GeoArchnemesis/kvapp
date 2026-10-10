"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { contactSubmissions } from "@/lib/db/schema";
import { contactErrors } from "@/content/text";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, contactErrors.fullNameRequired),
  email: z.string().trim().min(1, contactErrors.emailRequired).email(contactErrors.emailInvalid),
  phone: z.string().trim().min(4, contactErrors.phoneRequired),
  message: z.string().trim().optional(),
});

export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormState = {
  success?: boolean;
  errors?: Partial<Record<"fullName" | "email" | "phone", string>>;
  formError?: string;
  values?: ContactFormValues;
};

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    fullName: formData.get("fullName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      errors: {
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
      },
      values,
    };
  }

  try {
    await db.insert(contactSubmissions).values({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message || null,
    });
  } catch {
    return {
      formError: contactErrors.submitFailed,
      values,
    };
  }

  return { success: true };
}
