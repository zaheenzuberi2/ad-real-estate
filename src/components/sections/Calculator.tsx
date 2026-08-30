"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPkr } from "@/lib/format";

const TENURES = [12, 24, 36, 48, 60];

export function Calculator() {
  const [totalPrice, setTotalPrice] = useState(8_500_000);
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(36);

  const down = (totalPrice * downPct) / 100;
  const remaining = totalPrice - down;
  const monthly = remaining / tenure;

  return (
    <section id="calculator" className="bg-sand py-14 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Plan Your Investment"
          title="Installment Plan Calculator"
          intro="Estimate your down payment and monthly installment for projects like Margalla Orchard's 3-year plan."
          align="center"
        />

        <div className="mx-auto mt-8 grid max-w-4xl gap-5 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] sm:mt-12 sm:gap-8 sm:p-10 lg:grid-cols-2">
          <div className="space-y-5 sm:space-y-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="calc-price"
                  className="eyebrow text-[10px] text-slate-500"
                >
                  Total Price
                </label>
                <span className="font-display text-lg font-semibold text-navy-deep">
                  {formatPkr(totalPrice)}
                </span>
              </div>
              <input
                id="calc-price"
                type="range"
                min={2_000_000}
                max={100_000_000}
                step={500_000}
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[#C6A15B]"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="calc-down"
                  className="eyebrow text-[10px] text-slate-500"
                >
                  Down Payment
                </label>
                <span className="font-display text-lg font-semibold text-navy-deep">
                  {downPct}%
                </span>
              </div>
              <input
                id="calc-down"
                type="range"
                min={5}
                max={60}
                step={1}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="mt-3 w-full accent-[#C6A15B]"
              />
            </div>

            <fieldset>
              <legend className="eyebrow text-[10px] text-slate-500">
                Installment Tenure
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TENURES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenure(t)}
                    aria-pressed={tenure === t}
                    className={`tap rounded-full px-4 py-2 text-[11px] font-bold transition-colors sm:px-5 sm:py-2.5 sm:text-xs ${
                      tenure === t
                        ? "bg-navy text-white"
                        : "bg-sand text-navy hover:bg-hairline"
                    }`}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:flex sm:flex-col sm:justify-center sm:gap-5 sm:bg-navy-deep sm:p-7">
            <div className="bg-navy-deep p-4 sm:bg-transparent sm:p-0">
              <p className="eyebrow text-[9px] text-gold sm:text-[10px]">Down Payment</p>
              <p className="mt-1 font-display text-base font-semibold text-white sm:text-3xl">
                {formatPkr(down)}
              </p>
            </div>
            <div className="bg-navy-deep p-4 sm:border-t sm:border-white/10 sm:bg-transparent sm:p-0 sm:pt-5">
              <p className="eyebrow text-[9px] text-gold sm:text-[10px]">
                Monthly<span className="hidden sm:inline"> Installment</span>
              </p>
              <p className="mt-1 font-display text-base font-semibold text-gold sm:text-4xl">
                {formatPkr(monthly)}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400 sm:mt-1 sm:text-xs">
                over {tenure} months
              </p>
            </div>
            <div className="col-span-2 bg-navy-deep p-4 sm:border-t sm:border-white/10 sm:bg-transparent sm:p-0 sm:pt-5">
              <p className="eyebrow text-[9px] text-gold sm:text-[10px]">Total Remaining</p>
              <p className="mt-1 font-display text-base font-semibold text-white sm:text-2xl">
                {formatPkr(remaining)}
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-slate-500 sm:mt-5 sm:text-xs">
          Figures are indicative only and assume equal monthly installments with
          no markup. Confirm the actual schedule with an advisor before you
          commit.
        </p>
      </div>
    </section>
  );
}
