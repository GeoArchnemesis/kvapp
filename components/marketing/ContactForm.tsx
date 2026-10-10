"use client";

import { useActionState, useState } from "react";
import {
  ClockIcon,
  ShieldLineIcon,
  UserLineIcon,
  ArrowRightIcon,
  AlertIcon,
  CheckIcon,
} from "@/components/icons";
import { submitContactAction, type ContactFormState } from "@/lib/domain/contact/actions";
import { contact, contactErrors } from "@/content/text";
import { cn } from "@/lib/utils/cn";

const initialState: ContactFormState = {};

type FieldName = "fullName" | "email" | "phone";
type Values = Record<FieldName, string> & { message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BENEFIT_ICONS = [ClockIcon, ShieldLineIcon, UserLineIcon];

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.fullName.trim()) errors.fullName = contactErrors.fullNameRequired;
  if (!values.email.trim()) errors.email = contactErrors.emailRequired;
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = contactErrors.emailInvalid;
  if (!values.phone.trim()) errors.phone = contactErrors.phoneRequired;
  return errors;
}

function UnderlineField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  error,
  shake,
  className,
}: {
  label: string;
  name: FieldName;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  shake?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-bold">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-1.5 w-full border-b bg-transparent px-0.5 py-2 outline-none transition-colors",
          "focus:border-primary",
          error ? "border-primary" : "border-border",
          shake && "animate-[shake_0.4s_ease-in-out]"
        )}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  const [values, setValues] = useState<Values>({
    fullName: state.values?.fullName ?? "",
    email: state.values?.email ?? "",
    phone: state.values?.phone ?? "",
    message: state.values?.message ?? "",
  });
  const [clientErrors, setClientErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [shake, setShake] = useState<Partial<Record<FieldName, boolean>>>({});

  function setField(name: FieldName | "message", value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name !== "message" && clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setClientErrors(errors);
      const failing = Object.keys(errors) as FieldName[];
      setShake(Object.fromEntries(failing.map((k) => [k, true])));
      window.setTimeout(() => setShake({}), 400);
    }
  }

  const errorFor = (name: FieldName) => clientErrors[name] ?? state.errors?.[name];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="grid grid-cols-1 overflow-hidden rounded-[28px] shadow-[var(--shadow-card)] min-[860px]:grid-cols-[340px_1fr]">
        {/* Left panel — solid deep-violet, trust bullets, decorative circles */}
        <div className="relative overflow-hidden bg-accent-deep px-8 py-10 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-20px] left-8 h-24 w-24 rounded-full bg-primary"
          />

          <h2 className="relative text-2xl font-bold">{contact.panel.heading}</h2>
          <p className="relative mt-2 text-sm text-white/70">{contact.panel.body}</p>

          <ul className="relative mt-8 space-y-5">
            {contact.panel.benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm text-white/90">{benefit}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right panel — the form itself */}
        <div className="bg-surface px-8 py-10">
          {state.success ? (
            <div className="flex h-full animate-[fade-in_0.4s_ease-out] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <CheckIcon className="h-7 w-7 text-white" />
              </div>
              <p className="mt-4 text-lg font-semibold text-accent">{contact.success.title}</p>
              <p className="mt-2 text-foreground-muted">{contact.success.body}</p>
            </div>
          ) : (
            <form
              action={formAction}
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-6 min-[560px]:grid-cols-2"
            >
              <UnderlineField
                label={contact.fields.fullName}
                name="fullName"
                required
                value={values.fullName}
                onChange={(v) => setField("fullName", v)}
                error={errorFor("fullName")}
                shake={shake.fullName}
              />
              <UnderlineField
                label={contact.fields.email}
                name="email"
                type="email"
                required
                value={values.email}
                onChange={(v) => setField("email", v)}
                error={errorFor("email")}
                shake={shake.email}
              />
              <UnderlineField
                label={contact.fields.phone}
                name="phone"
                type="tel"
                required
                className="min-[560px]:col-span-2"
                value={values.phone}
                onChange={(v) => setField("phone", v)}
                error={errorFor("phone")}
                shake={shake.phone}
              />

              <div className="min-[560px]:col-span-2">
                <label htmlFor="message" className="text-sm font-bold">
                  {contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={values.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className="mt-1.5 w-full resize-none border-b border-border bg-transparent px-0.5 py-2 outline-none transition-colors focus:border-primary"
                />
              </div>

              {state.formError && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-primary min-[560px]:col-span-2">
                  <AlertIcon className="h-4 w-4 shrink-0" />
                  {state.formError}
                </p>
              )}

              <div className="flex justify-end min-[560px]:col-span-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-button)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {pending ? contact.submitting : contact.submit}
                  {!pending && (
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
