import { z } from 'zod';

// --- Schemas ---

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Vardas yra privalomas')
    .max(100, 'Vardas per ilgas (maks. 100 simbolių)'),
  phone: z
    .string()
    .max(20, 'Telefono numeris per ilgas')
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{0,20}$/.test(val),
      'Neteisingas telefono formatas'
    )
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(100, 'Įmonės pavadinimas per ilgas (maks. 100 simbolių)')
    .optional()
    .or(z.literal('')),
});

export const avatarModelSchema = z.object({
  name: z
    .string()
    .min(2, 'Pavadinimas turi būti bent 2 simbolių')
    .max(50, 'Pavadinimas per ilgas (maks. 50 simbolių)'),
});

// --- Types ---

export type ProfileFormData = z.infer<typeof profileSchema>;
export type AvatarModelFormData = z.infer<typeof avatarModelSchema>;

// --- Helpers ---

/**
 * Validate a single field value against a schema.
 * Returns the error message string, or null if valid.
 */
export function validateField(
  schema: z.ZodObject<z.ZodRawShape>,
  field: string,
  value: unknown
): string | null {
  const partial: Record<string, unknown> = {};
  // Build a minimal object with just this field
  partial[field] = value;

  // Parse the full object with all other fields set to valid defaults
  const result = schema.safeParse(partial);
  if (result.success) return null;

  // Find the error for our specific field
  for (const issue of result.error.issues) {
    if (issue.path[0] === field) {
      return issue.message;
    }
  }
  return null;
}

/**
 * Validate an entire object against a schema.
 * Returns a map of field -> error message, or empty object if all valid.
 */
export function validateAll(
  schema: z.ZodObject<z.ZodRawShape>,
  data: Record<string, unknown>
): Record<string, string> {
  const result = schema.safeParse(data);
  if (result.success) return {};

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field && typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
