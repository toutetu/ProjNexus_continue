import { Bell, Search } from 'lucide-react';

import Breadcrumb from '@/Components/Layout/Breadcrumb';
import type { BreadcrumbItem } from '@/types';

interface HeaderProps {
    breadcrumb: BreadcrumbItem[];
}

export default function Header({ breadcrumb }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-jpt-border bg-white px-6">
            <Breadcrumb items={breadcrumb} />

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-md border border-jpt-border px-3 py-1.5 text-sm transition-colors hover:bg-jpt-bg focus:outline-none focus:ring-2 focus:ring-jpt-blue/40"
                    aria-label="検索（⌘K）"
                >
                    <Search className="h-4 w-4 text-jpt-muted" />
                    <span className="text-jpt-muted">検索...</span>
                    <span className="rounded border border-[#CED4DA] bg-[#E9ECEF] px-1.5 py-0.5 font-mono text-[11px] text-[#495057]">
                        ⌘K
                    </span>
                </button>
                <button
                    type="button"
                    className="relative rounded-md p-2 transition-colors hover:bg-jpt-bg focus:outline-none focus:ring-2 focus:ring-jpt-blue/40"
                    aria-label="通知"
                >
                    <Bell className="h-5 w-5 text-jpt-dark" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-jpt-red" />
                </button>
            </div>
        </header>
    );
}
