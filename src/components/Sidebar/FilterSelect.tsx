import { useState, useMemo, useCallback } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: Option[];
  placeholder: string;
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  dataCy?: string;
}

function FilterSelect({ options, placeholder, selectedValues, onSelect, dataCy }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    , [options, searchTerm]);

  const toggleOption = useCallback((optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    onSelect(newValues);
  }, [selectedValues, onSelect]);

  const displayValue = selectedValues.length > 0
    ? `${selectedValues.length} ${selectedValues.length > 1 ? 'selecionados' : 'selecionado'}`
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          data-cy={dataCy}
          className="w-full justify-between"
        >
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80">
        <div className="p-2">
          <Input
            placeholder={placeholder?.replace('Selecione', 'Pesquise')}
            value={searchTerm}
            data-cy="search-filter"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => toggleOption(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-center py-4 text-muted-foreground">
                Nenhuma correspondência encontrada. Tente novamente.
              </p>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default FilterSelect;