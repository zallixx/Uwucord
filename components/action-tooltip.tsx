'use client';

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionTooltipProps {
    readonly label: string;
    readonly children: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    readonly side?: 'top' | 'right' | 'bottom' | 'left';
    // eslint-disable-next-line react/require-default-props
    readonly align?: 'start' | 'center' | 'end';
}

function ActionTooltip({ label, children, side, align }: ActionTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
export default ActionTooltip;
