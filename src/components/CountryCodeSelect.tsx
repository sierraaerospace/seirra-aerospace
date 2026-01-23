import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
}

export const countries: Country[] = [
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "AE", name: "UAE", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
];

interface CountryCodeSelectProps {
  value: Country;
  onChange: (country: Country) => void;
  disabled?: boolean;
}

const CountryCodeSelect = ({ value, onChange, disabled }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center justify-between gap-1 h-[50px] px-3 bg-secondary border border-border border-r-0 text-foreground hover:bg-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[90px]"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{value.dialCode}</span>
        </div>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border shadow-lg z-50 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-accent/20 transition-colors ${
                  value.code === country.code ? 'bg-accent/10' : ''
                }`}
              >
                <span className="text-xs font-medium text-muted-foreground w-8">{country.code}</span>
                <span className="text-sm flex-1 truncate">{country.name}</span>
                <span className="text-sm font-medium text-foreground">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CountryCodeSelect;
