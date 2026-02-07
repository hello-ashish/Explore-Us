import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface AdvancedFiltersProps {
  pricing: string[];
  onPricingChange: (pricing: string[]) => void;
  sortBy: "name" | "rating" | "reviews" | "trending";
  onSortChange: (sort: "name" | "rating" | "reviews" | "trending") => void;
  onReset: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  pricing,
  onPricingChange,
  sortBy,
  onSortChange,
  onReset,
}) => {
  const handlePricingToggle = (pricingType: string) => {
    if (pricing.includes(pricingType)) {
      onPricingChange(pricing.filter((p) => p !== pricingType));
    } else {
      onPricingChange([...pricing, pricingType]);
    }
  };

  const pricingOptions = [
    { value: "free", label: "Free" },
    { value: "freemium", label: "Freemium" },
    { value: "paid", label: "Paid" },
  ];

  const sortOptions = [
    { value: "name" as const, label: "Name (A-Z)" },
    { value: "rating" as const, label: "Highest Rated" },
    { value: "reviews" as const, label: "Most Reviewed" },
    { value: "trending" as const, label: "Trending" },
  ];

  const isActive = pricing.length > 0 || sortBy !== "name";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={isActive ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Filters
          {isActive && (
            <Badge className="ml-2 bg-primary/20 text-primary">
              {(pricing.length ? pricing.length : 0) + (sortBy !== "name" ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>Refine your search results</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Pricing Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Pricing</h3>
            <div className="space-y-2">
              {pricingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pricing-${option.value}`}
                    checked={pricing.includes(option.value)}
                    onCheckedChange={() => handlePricingToggle(option.value)}
                  />
                  <Label
                    htmlFor={`pricing-${option.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => onSortChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="ghost"
            className="w-full"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
