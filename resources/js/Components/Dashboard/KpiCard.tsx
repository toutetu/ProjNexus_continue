import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Accent = 'cyan-blue' | 'yellow' | 'blue-purple' | 'red';

interface KpiCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    unit?: string;
    badge?: { text: string; tone?: 'default' | 'warn' | 'danger' };
    footer?: string;
    progress?: number;
    accent: Accent;
}

const accentClassMap: Record<Accent, string> = {
    'cyan-blue': 'bg-gradient-to-r from-jpt-cyan to-jpt-blue',
    yellow: 'bg-jpt-accent',
    'blue-purple': 'bg-gradient-to-r from-jpt-blue to-jpt-purple',
    red: 'bg-jpt-red',
};

const badgeClassMap = {
    default: 'bg-blue-50 text-jpt-blue',
    warn: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-jpt-red',
} as const;

export default function KpiCard({
    icon: Icon,
    label,
    value,
    unit,
    badge,
    footer,
    progress,
    accent,
}: KpiCardProps) {
    const isDanger = accent === 'red';

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-lg border bg-white p-4 shadow-sm transition-all duration-150',
                'cursor-pointer hover:-translate-y-0.5 hover:shadow-md',
                isDanger ? 'border-2 border-jpt-red/20' : 'border-jpt-border',
            )}
        >
            <div className={cn('absolute left-0 right-0 top-0 h-1', accentClassMap[accent])} />
            <div
                className={cn(
                    'mb-1.5 flex items-center gap-1.5 text-xs font-medium',
                    isDanger ? 'text-jpt-red' : 'text-jpt-muted',
                )}
            >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
            </div>

            <div className="mb-2 flex items-end justify-between gap-2">
                <div className="flex items-baseline gap-1">
                    <span
                        className={cn(
                            'font-mono text-3xl font-bold tracking-tight',
                            isDanger ? 'text-jpt-red' : 'text-jpt-dark',
                        )}
                    >
                        {value}
                    </span>
                    {unit && <span className="ml-0.5 text-xs text-jpt-muted">{unit}</span>}
                </div>
                {badge && (
                    <span
                        className={cn(
                            'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                            badgeClassMap[badge.tone ?? 'default'],
                        )}
                    >
                        {badge.text}
                    </span>
                )}
            </div>

            {typeof progress === 'number' && (
                <div className="mb-0.5 h-1.5 overflow-hidden rounded-full bg-jpt-bg">
                    <div
                        className={cn(
                            'h-full rounded-full',
                            isDanger ? 'bg-jpt-red' : 'bg-gradient-to-r from-jpt-blue to-jpt-purple',
                        )}
                        style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
                    />
                </div>
            )}

            {footer && (
                <div className={cn('mt-0.5 text-[11px]', isDanger ? 'text-jpt-red' : 'text-jpt-muted')}>
                    {footer}
                </div>
            )}
        </div>
    );
}
