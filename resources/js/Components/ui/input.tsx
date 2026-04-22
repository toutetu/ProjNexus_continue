import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'flex h-10 w-full rounded-md border border-jpt-border bg-white px-3 py-2 text-sm text-jpt-dark shadow-sm transition-colors',
                'placeholder:text-jpt-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jpt-blue focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export { Input };
