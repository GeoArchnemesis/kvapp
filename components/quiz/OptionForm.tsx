import { Button } from "@/components/ui/Button";
import type { StepConfig } from "@/lib/domain/quiz/config";

export function OptionForm({
  config,
  action,
  currentValue,
  hasError,
}: {
  config: StepConfig;
  action: (formData: FormData) => void;
  currentValue: unknown;
  hasError?: boolean;
}) {
  const selected = new Set(
    Array.isArray(currentValue) ? currentValue : currentValue ? [String(currentValue)] : []
  );

  return (
    <form action={action}>
      <h1 className="text-2xl font-bold">{config.questionKa}</h1>

      {hasError && (
        <p className="mt-3 text-sm font-medium text-primary">
          გთხოვთ, გააკეთოთ არჩევანი გასაგრძელებლად.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {config.options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
          >
            <input
              type={config.multi ? "checkbox" : "radio"}
              name={config.key}
              value={option.value}
              defaultChecked={selected.has(option.value)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            <span className="font-medium">{option.labelKa}</span>
          </label>
        ))}
      </div>

      <Button type="submit" className="mt-8 w-full">
        გაგრძელება
      </Button>
    </form>
  );
}
