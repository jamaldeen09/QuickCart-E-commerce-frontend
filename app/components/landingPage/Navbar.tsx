"use client"
import { assets } from "@/app/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleTriggerPayload } from "../reusable/AuthModal";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxTypes";
import { setTrigger } from "@/app/redux/triggers/triggers";
import CustomAvatar from "../reusable/CustomAvatar";
import { AuthenticationSystem } from "@/app/api/auth";
import { refreshProfile } from "@/app/redux/data/profileSlice";
import { callToast } from "@/app/utils/authHandlers";
import ProfileSkeleton from "../reusable/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useResizer } from "@/app/customHooks/resizer";



export const NavIcon = ({
    src,
    alt,
    size = 17,
    className,
}: { src: StaticImageData, alt: string, size?: number, className?: string }): React.ReactElement => {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            className={className}
            unoptimized
        />
    )
}


export const generateDropdownIcon = (
    iconUsage: "Manage Account" | "Cart" | "My Orders" | "Sign Out"
) => {

    if (iconUsage === "Manage Account")
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-4">
                <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z" />
                <path fillRule="evenodd" d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z" clipRule="evenodd" />
            </svg>
        )

    if (iconUsage === "Cart")
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-4">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
        )

    if (iconUsage === "My Orders")
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-4">
                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
            </svg>
        )

    if (iconUsage === "Sign Out")
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
        )

    return (
        <div></div>
    )
}


const Navbar = (): React.ReactElement => {
    interface NavLink {
        linkName: string;
        href: string;
        id: number;
    }
    const navLinks: NavLink[] = [
        { linkName: "Home", href: "/", id: 1 },
        { linkName: "Shop", href: "/shop", id: 2 },
        { linkName: "About Us", href: "/about", id: 3 },
        { linkName: "Contact", href: "/contact", id: 4 },
    ];

    const router = useRouter();
    const payload = handleTriggerPayload("authModal", true);
    const dispatch = useAppDispatch();
    const { avatar, fullname, fetching, email, role } = useAppSelector((state) => state.profileInformation);
    const currentPath = usePathname();
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";


    interface AuthenticatedData {
        icon: React.ReactElement;
        linkName: string;
        funcToExecute: () => void;
    }


    const AuthenticatedDropdownData: AuthenticatedData[] = [
        {
            icon: generateDropdownIcon("Manage Account"),
            linkName: "Manage Account",
            funcToExecute: () => dispatch(setTrigger({ key: "profileModal", value: true }))
        },
        {
            icon: generateDropdownIcon("Cart"),
            linkName: "Cart",
            funcToExecute: () => router.push("/cart")
        },
        {
            icon: generateDropdownIcon("My Orders"),
            linkName: "My Orders",
            funcToExecute: () => router.push("/my-orders")
        },
    ];

    const signOutData = {
        icon: generateDropdownIcon("Sign Out"),
        linkName: "Sign Out",
        funcToExecute: () => {
            dispatch(refreshProfile());
            AuthenticationSystem.logout(router);
            callToast("success", "Successfully signed out");
        }
    }

    const [screenSize] = useResizer(450)
    return (
        <nav
            className="responsive-nav py-4 border-b border-gray-200 gap-20"
        >
            {/* logo */}
            <div>
                <Image
                    src={assets.logo}
                    alt="QuickCart logo"
                    width={140}
                    unoptimized
                />
            </div>

            {/* links (desktop + tablet) */}
            {!currentPath.startsWith("/admin-dashboard") && <ul className="hidden md:flex items-center gap-6">
                {navLinks.map((link: NavLink): React.ReactElement => {
                    return (
                        <Link
                            href={link.href}
                            key={link.linkName}
                            className="cursor-pointer text-gray-500 font-medium hover:text-gray-600 transition-colors duration-200 text-md"
                        >
                            {link.linkName}
                        </Link>
                    )
                })}
                {!role || role.trim() === "" || role === "user" ? null : (
                    <Button onClick={() => router.push("/admin-dashboard")} size="sm" variant="outline" className="cursor-pointer  hover:text-gray-600  text-gray-500 rounded-full">
                        Admin Dashboard
                    </Button>
                )}
            </ul>}

            {/* account + search (desktop + tablet) */}
            {!currentPath.startsWith("/admin-dashboard") && (
                <div className="hidden md:flex items-center gap-3">

                    {/* search */}
                    <NavIcon
                        src={assets.search_icon}
                        alt="Search Icon"
                    />

                    {/* account */}
                    {fetching ? (
                        <ProfileSkeleton />
                    ) : avatar && fullname ? (


                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                                <div
                                    className="flex items-center gap-3 focus:outline-none focus:ring-0"
                                >
                                    <CustomAvatar
                                        src={avatar}
                                        fallback={`${fullname}'s avatar`}
                                        size="xs"
                                        className="cursor-pointer hover:brightness-75 transition-all duration-300"
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-2 hidden md:flex flex-col" align="end">
                                <div
                                    className="flex items-center gap-4 mt-2 py-2 w-60 px-4 hover:bg-transparent"
                                >
                                    <CustomAvatar
                                        src={avatar}
                                        fallback={`${fullname}'s avatar`}
                                        size="sm"
                                    />

                                    <div className="flex flex-col">
                                        <p className="truncate text-ellipsis overflow-hidden max-w-[200px] font-medium text-sm">
                                            {fullname}
                                        </p>
                                        <p className="truncate text-ellipsis overflow-hidden max-w-[200px] font-light text-xs">
                                            {email.activeEmail}
                                        </p>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />
                                {AuthenticatedDropdownData.map((data: AuthenticatedData): React.ReactElement => {
                                    return (
                                        <DropdownMenuItem
                                            variant={data.linkName === "Sign Out" ? "destructive" : "default"}
                                            key={data.linkName}
                                            onClick={data.funcToExecute}
                                            className="py-2 px-4 mt-2 gap-3 cursor-pointer hover:bg-gray-50"
                                        >
                                            {data.icon}
                                            {data.linkName}
                                        </DropdownMenuItem>
                                    )
                                })}
                                <DropdownMenuItem
                                    variant="destructive"
                                    key={signOutData.linkName}
                                    onClick={signOutData.funcToExecute}
                                    className="py-2 px-4 mt-2 gap-3 cursor-pointer hover:bg-gray-50"
                                >
                                    {signOutData.icon}
                                    {signOutData.linkName}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : <button
                        onClick={() => {
                            router.push(`${currentPath}${id ? `?id=${id}&auth=register` : `?auth=register`}`);
                            dispatch(setTrigger(payload))
                        }}
                        className="flex gap-2 cursor-pointer px-2 py-1 hover:bg-gray-50 transition-colors duration-200 rounded-sm"
                    >
                        <NavIcon
                            src={assets.user_icon}
                            alt="User Icon"
                        />
                        <p className="font-medium text-gray-600 text-sm">Account</p>
                    </button>}
                </div>
            )}

            {/* dropdown menu (mobile) */}
            {!currentPath.startsWith("/admin-dashboard") && (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="focus:outline-none focus:ring-gray-400 p-2 rounded-sm cursor-pointer hover:bg-gray-100 transition-all duration-200 focus:ring-1 block md:hidden"
                    >
                        <NavIcon
                            src={assets.menu_icon}
                            alt="Menu Icon"
                            size={20}
                            className="cursor-pointer block md:hidden"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-2 p-2">
                        {/* dropdown links */}
                        {navLinks.map((link: NavLink): React.ReactElement => {
                            return (
                                <DropdownMenuItem
                                    key={link.id}
                                    className="cursor-pointer w-60 mb-2 px-4"
                                    onClick={() => router.push(link.href)}
                                >
                                    {link.linkName}
                                </DropdownMenuItem>
                            )
                        })}

                        <DropdownMenuSeparator />

                        {/* search */}
                        {avatar && fullname ? (
                            <>
                                <div
                                    className="flex items-center space-x-2 my-4 px-4">
                                    <CustomAvatar
                                        src={avatar}
                                        fallback={`${fullname}'s avatar`}
                                        size="xs"
                                    />
                                    <p className="truncate text-ellipsis overflow-hidden max-w-[200px] text-sm">
                                        {fullname}
                                    </p>
                                </div>

                                <DropdownMenuItem className="cursor-pointer my-2 px-4 flex items-center gap-4">
                                    <NavIcon
                                        src={assets.search_icon}
                                        alt="Search Icon"
                                        size={15}
                                    />
                                    <p className="text-sm">Search</p>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem className="cursor-pointer my-2 px-4 flex items-center gap-4">
                                <NavIcon
                                    src={assets.search_icon}
                                    alt="Search Icon"
                                    size={15}
                                />
                                <p className="text-sm">Search</p>
                            </DropdownMenuItem>
                        )}

                        {/* account */}
                        {fetching ? (
                            <DropdownMenuItem>
                                <ProfileSkeleton />
                            </DropdownMenuItem>
                        ) : avatar && fullname ? (
                            <>
                                {AuthenticatedDropdownData.map((data: AuthenticatedData) => {
                                    return (
                                        <DropdownMenuItem
                                            variant={data.linkName === "Sign Out" ? "destructive" : "default"}
                                            key={data.linkName}
                                            onClick={data.funcToExecute}
                                            className="py-2 px-4 mt-2 gap-3 cursor-pointer hover:bg-gray-50"
                                        >
                                            {data.icon}
                                            {data.linkName}
                                        </DropdownMenuItem>

                                    )
                                })}
                                {role === "admin" && (
                                    <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}
                                        className="py-2 px-4 mt-2 gap-3 cursor-pointer hover:bg-gray-50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-4">
                                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                        </svg>
                                        Admin dashboard
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    variant="destructive"
                                    key={signOutData.linkName}
                                    onClick={signOutData.funcToExecute}
                                    className="py-2 px-4 mt-2 gap-3 cursor-pointer hover:bg-gray-50"
                                >
                                    {signOutData.icon}
                                    {signOutData.linkName}
                                </DropdownMenuItem>

                            </>
                        ) : (
                            <DropdownMenuItem
                                onClick={() => {
                                    router.push(`${currentPath}${id || id.trim() === "" ? `?id=${id}&auth=register` : `?auth=register`}`);
                                    dispatch(setTrigger(payload))
                                }}
                                className="cursor-pointer px-4 flex items-center gap-4"
                            >
                                <NavIcon
                                    src={assets.user_icon}
                                    alt="User Icon"
                                    size={15}
                                />
                                <p className="text-sm">Account</p>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {currentPath.startsWith("/admin-dashboard") && (
                <div className="hidden md:block" />
            )}

            {currentPath.startsWith("/admin-dashboard") && (
                !screenSize ? (
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => {
                                dispatch(refreshProfile());
                                AuthenticationSystem.logout(router);
                                router.push("/")
                                callToast("success", "Successfully signed out");
                            }}
                            size={screenSize ? "sm" : "lg"}
                            className="cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-full"
                        >
                            Log out
                        </Button>
                        <Button
                            onClick={() => router.push("/")}
                            variant="outline"
                            size={screenSize ? "sm" : "lg"}
                            className="cursor-pointer rounded-full"
                        >
                            {!screenSize && (
                                <ArrowLeft size={16} />
                            )}
                            Go back
                        </Button>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none focus:ring-1 focus:ring-black p-2 rounded-sm transition-all duration-300">
                            <Image
                                src={assets.menu_icon}
                                alt="menu_icon"
                                unoptimized
                                className="cursor-pointer"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => router.push("/")}
                                className="cursor-pointer">
                                <ArrowLeft size={16} />
                                Go Back
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    dispatch(refreshProfile());
                                    AuthenticationSystem.logout(router);
                                    router.push("/")
                                    callToast("success", "Successfully signed out");
                                }}
                                variant="destructive" className="cursor-pointer">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            )}
        </nav >
    );
};

export default Navbar;