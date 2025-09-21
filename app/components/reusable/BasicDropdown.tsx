import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CustomDropdownProps {
    children: React.ReactNode;
    position?: "center" | "end" | "start";
    label?: string;
    showSeperator?: boolean;
    dropdownItems: string[];
}

const BasicDropdown = ({
    children,
    position = "center",
    label,
    showSeperator,
    dropdownItems,
}: CustomDropdownProps): React.ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={position}
            >
                <DropdownMenuLabel>
                    {label}
                </DropdownMenuLabel>
                {showSeperator && (
                    <DropdownMenuSeparator />
                )}
                {dropdownItems.map((item, i: number) => {
                    return (
                        <DropdownMenuItem key={i}>
                            {item}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BasicDropdown;