"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions/submit-lead";
import type { LeadFormState } from "@/lib/lead-schema";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";

const initialState: LeadFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="mt-2 w-full disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Submit Enquiry"}
      {!pending && <Icon name="arrow-right" className="h-4 w-4" />}
    </Button>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  const id = `lead-${name}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-[10px] text-slate-500">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 w-full border-b bg-transparent py-3.5 text-base sm:text-sm text-navy-deep placeholder:text-slate-400 focus:outline-none focus:border-gold ${
          error ? "border-red-500" : "border-hairline"
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  projectTitles,
  defaultProject,
}: {
  /** Live titles from the caller, so the dropdown never lags behind Studio. */
  projectTitles: string[];
  /** Pre-selects the project when the form is embedded on that project's own page. */
  defaultProject?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-white p-7 text-center shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/15">
          <Icon name="check" className="h-7 w-7 text-whatsapp-dark" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-navy-deep">
          Enquiry Received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
          {state.message}
        </p>
        <Button href={site.whatsapp.href} external variant="whatsapp" className="mt-6">
          <WhatsAppGlyph className="h-4 w-4" />
          Message Us Now
        </Button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] sm:p-9"
      noValidate
    >
      <h3 className="font-display text-2xl font-semibold text-navy-deep">
        Request A Callback
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Share a few details and an advisor will reach out on WhatsApp within one
        business day.
      </p>

      <div className="mt-7 space-y-5">
        <Field
          label="Full Name"
          name="name"
          placeholder="e.g. Ahmed Raza"
          error={state.fieldErrors?.name}
        />
        <Field
          label="WhatsApp Number"
          name="whatsapp"
          type="tel"
          placeholder="+92 300 1234567"
          error={state.fieldErrors?.whatsapp}
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={state.fieldErrors?.email}
        />

        <div>
          <label
            htmlFor="lead-project"
            className="eyebrow block text-[10px] text-slate-500"
          >
            Project Of Interest
          </label>
          <div className="relative">
            <select
              id="lead-project"
              name="project"
              required
              defaultValue={defaultProject ?? ""}
              aria-invalid={state.fieldErrors?.project ? true : undefined}
              className="mt-1.5 w-full appearance-none border-b border-hairline bg-transparent py-3.5 pr-6 text-base sm:text-sm text-navy-deep focus:border-gold focus:outline-none"
            >
              <option value="" disabled>
                Select a project
              </option>
              {projectTitles.map((title) => (
                <option key={title} value={title}>
                  {title}, Islamabad
                </option>
              ))}
              <option value="General Enquiry">General Enquiry</option>
            </select>
            <Icon
              name="chevron-down"
              className="pointer-events-none absolute bottom-4 right-0 h-4 w-4 text-gold"
            />
          </div>
          {state.fieldErrors?.project && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {state.fieldErrors.project}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lead-message"
            className="eyebrow block text-[10px] text-slate-500"
          >
            Message <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            placeholder="Budget, preferred size, timeline…"
            className="mt-1.5 w-full resize-none border-b border-hairline bg-transparent py-3.5 text-base sm:text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Honeypot — hidden from people, attractive to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor="lead-company">Company</label>
          <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {state.status === "error" && !state.fieldErrors && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700">
            {state.message}
          </p>
        )}

        <SubmitButton />

        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          By submitting, you agree to be contacted by {site.name} regarding your
          enquiry.
        </p>
      </div>
    </form>
  );
}
