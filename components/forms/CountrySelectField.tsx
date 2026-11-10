'use client';

import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Command as CommandPrimitive } from 'cmdk';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import countryList from 'react-select-country-list';

// Helper function to get flag emoji
const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const CountrySelect = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const [open, setOpen] = useState(false);

    const countries = useMemo(() => countryList().getData(), []);
    const selectedCountry = countries.find((c) => c.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='country-select-trigger hover:bg-gray-800 aria-expanded:bg-gray-800 dark:hover:bg-gray-800'
                    />
                }
            >
                {selectedCountry ? (
                    <span className='flex items-center gap-2'>
                        <span>{getFlagEmoji(selectedCountry.value)}</span>
                        <span>{selectedCountry.label}</span>
                    </span>
                ) : (
                    'Select your country...'
                )}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </PopoverTrigger>
            <PopoverContent
                align='start'
                sideOffset={6}
                className='gap-0 overflow-hidden rounded-lg border border-gray-600 p-0 shadow-xl'
                style={{
                    width: 'var(--anchor-width)',
                    minWidth: '16rem',
                    backgroundColor: '#141414',
                    animation: 'none',
                }}
            >
                <CommandPrimitive
                    // Plain "contains" search instead of cmdk's fuzzy match (which made "hun" match Lithuania etc.)
                    filter={(itemValue, search) =>
                        itemValue.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0
                    }
                    className='flex w-full flex-col bg-gray-800 text-gray-400'
                >
                    <div className='flex items-center gap-2 border-b border-gray-600 px-3'>
                        <Search className='h-4 w-4 shrink-0 text-gray-500' />
                        <CommandPrimitive.Input
                            placeholder='Search countries...'
                            className='h-12 w-full bg-transparent text-base text-gray-400 outline-none placeholder:text-gray-500'
                        />
                    </div>
                    <CommandPrimitive.List className='scrollbar-hide-default max-h-60 overflow-y-auto overflow-x-hidden p-1'>
                        <CommandPrimitive.Empty className='py-6 text-center text-sm text-gray-500'>
                            No country found.
                        </CommandPrimitive.Empty>
                        {countries.map((country) => (
                            <CommandPrimitive.Item
                                key={country.value}
                                value={`${country.label} ${country.value}`}
                                onSelect={() => {
                                    onChange(country.value);
                                    setOpen(false);
                                }}
                                className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-base text-gray-100 data-[selected=true]:bg-gray-600'
                            >
                                <span className='shrink-0'>{getFlagEmoji(country.value)}</span>
                                <span className='flex-1'>{country.label}</span>
                                {value === country.value && (
                                    <Check className='h-4 w-4 shrink-0 text-yellow-500' />
                                )}
                            </CommandPrimitive.Item>
                        ))}
                    </CommandPrimitive.List>
                </CommandPrimitive>
            </PopoverContent>
        </Popover>
    );
};

export const CountrySelectField = ({
    name,
    label,
    control,
    error,
    required = false,
}: CountrySelectProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};
