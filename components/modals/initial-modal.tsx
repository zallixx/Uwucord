"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export const InitialModal = () => {
    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader>
                    <DialogTitle>TODO</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}