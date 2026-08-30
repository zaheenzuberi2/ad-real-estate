"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { phases } from "@/content/site-content";
import {
  propertyTypes,
  budgetBands,
  bedroomTypes,
  bedroomOptions,
} from "@/content/properties";
import { Icon } from "@/components/ui/Icon";

const ANY = "any";

function Select({
  label,
  value,
  onChange,
  options,
  anyLabel,
  disabled,
  disabledHint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  anyLabel: string;
  disabled?: boolean;
  disabledHint?: string;
}) {
  const id = `search-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={`flex-1 px-5 py-3 ${disabled ? "opacity-50" : ""}`}>
      <label htmlFor={id} className="eyebrow block text-[10px] text-slate-500">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          aria-describedby={disabled && disabledHint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-2.5 pr-6 text-base font-semibold text-navy focus:outline-none disabled:cursor-not-allowed sm:text-sm"
        >
          <option value={ANY}>{disabled && disabledHint ? disabledHint : anyLabel}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
        />
      </div>
    </div>
  );
}

export function PropertySearch() {
  const router = useRouter();
  const [location, setLocation] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [beds, setBeds] = useState(ANY);
  const [budget, setBudget] = useState(ANY);

  const bedsEnabled = (bedroomTypes as readonly string[]).includes(type);

  const changeType = (next: string) => {
    setType(next);
    // Bedrooms only apply to built homes — drop the value when it no longer fits.
    if (!(bedroomTypes as readonly string[]).includes(next)) setBeds(ANY);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location !== ANY) params.set("phase", location);
    if (type !== ANY) params.set("type", type);
    if (bedsEnabled && beds !== ANY) params.set("beds", beds);
    if (budget !== ANY) params.set("budget", budget);
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-px overflow-hidden rounded-2xl bg-hairline shadow-2xl lg:flex-row lg:items-stretch"
      role="search"
      aria-label="Property search"
    >
      <div className="flex flex-1 flex-col gap-px bg-hairline sm:flex-row">
        <div className="flex flex-1 bg-white">
          <Select
            label="Location"
            value={location}
            onChange={setLocation}
            options={phases}
            anyLabel="Any Location"
          />
        </div>
        <div className="flex flex-1 bg-white">
          <Select
            label="Property Type"
            value={type}
            onChange={changeType}
            options={propertyTypes}
            anyLabel="Any Type"
          />
        </div>
        <div className="flex flex-1 bg-white">
          <Select
            label="Bedrooms"
            value={beds}
            onChange={setBeds}
            options={bedroomOptions}
            anyLabel="Any"
            disabled={!bedsEnabled}
            disabledHint="Pick a home type"
          />
        </div>
        <div className="flex flex-1 bg-white">
          <Select
            label="Budget"
            value={budget}
            onChange={setBudget}
            options={budgetBands.slice(1).map((b) => b.label)}
            anyLabel="Any Budget"
          />
        </div>
      </div>
      <button
        type="submit"
        className="tap flex items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-bold text-navy-deep transition-colors hover:bg-gold-bright lg:px-10"
      >
        <Icon name="search" className="h-4 w-4" />
        Search Properties
      </button>
    </form>
  );
}
