"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
  /** Value in kobo (smallest unit). Displayed as Naira. */
  value?: number;
  /** Called with value in kobo */
  onChange?: (valueInKobo: number) => void;
}

function formatWithCommas(val: string): string {
  const cleaned = val.replace(/[^\d]/g, "");
  if (!cleaned) return "";
  return Number(cleaned).toLocaleString("en-NG");
}

function koboToNairaString(kobo: number): string {
  const naira = Math.round(kobo / 100);
  return naira > 0 ? naira.toLocaleString("en-NG") : "";
}

function nairaStringToKobo(str: string): number {
  const cleaned = str.replace(/[^\d]/g, "");
  const naira = Number(cleaned) || 0;
  return naira * 100;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, placeholder = "0", ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() =>
      value !== undefined ? koboToNairaString(value) : ""
    );

    const isControlled = value !== undefined;

    React.useEffect(() => {
      if (isControlled) {
        setDisplayValue(koboToNairaString(value));
      }
    }, [value, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const formatted = formatWithCommas(raw);
      setDisplayValue(formatted);
      onChange?.(nairaStringToKobo(raw));
    };

    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
          ₦
        </span>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white pl-7 pr-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
