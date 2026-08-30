"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { phases } from "@/content/site-content";
import {
  propertyTypes,
  budgetBands,
  bedroomTypes,
  bedroomOptions,
} from "@/content/properties";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const ANY = "";

function FilterSelect({
  label,
  param,
  options,
  anyLabel,
  disabled,
  disabledHint,
}: {
  label: string;
  param: string;
  options: readonly string[];
  anyLabel: string;
  disabled?: boolean;
  disabledHint?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(param) ?? ANY;
  const id = `filter-${param}`;

  const update = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(param, value);
    else next.delete(param);
    const qs = next.toString();
    router.push(qs ? `/properties?${qs}` : "/properties", { scroll: false });
  };

  return (
    <div
      className={`flex-1 border-hairline px-5 py-3 sm:border-r sm:last:border-r-0 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <label htmlFor={id} className="eyebrow block text-[10px] text-slate-500">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={current}
          disabled={disabled}
          onChange={(e) => update(e.target.value)}
          className="w-full appearance-none bg-transparent py-2.5 pr-6 text-base font-semibold text-navy focus:outline-none disabled:cursor-not-allowed sm:text-sm"
        >
          <option value={ANY}>
            {disabled && disabledHint ? disabledHint : anyLabel}
          </option>
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

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;

  const typeParam = searchParams.get("type") ?? "";
  const bedsEnabled = (bedroomTypes as readonly string[]).includes(typeParam);

  // Keep the URL honest: a `beds` value can't survive a non-home property type.
  useEffect(() => {
    if (!bedsEnabled && searchParams.has("beds")) {
      const next = new URLSearchParams(searchParams.toString());
      next.delete("beds");
      const qs = next.toString();
      router.replace(qs ? `/properties?${qs}` : "/properties", { scroll: false });
    }
  }, [bedsEnabled, searchParams, router]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 flex-col divide-y divide-hairline overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] sm:flex-row sm:divide-y-0">
        <FilterSelect
          label="Location"
          param="phase"
          options={phases}
          anyLabel="Any Location"
        />
        <FilterSelect
          label="Property Type"
          param="type"
          options={propertyTypes}
          anyLabel="Any Type"
        />
        <FilterSelect
          label="Bedrooms"
          param="beds"
          options={bedroomOptions}
          anyLabel="Any"
          disabled={!bedsEnabled}
          disabledHint="Pick a home type"
        />
        <FilterSelect
          label="Budget"
          param="budget"
          options={budgetBands.slice(1).map((b) => b.label)}
          anyLabel="Any Budget"
        />
      </div>

      {hasFilters && (
        <Button
          type="button"
          onClick={() => router.push("/properties", { scroll: false })}
          variant="ghost"
          size="sm"
          className="shrink-0"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
