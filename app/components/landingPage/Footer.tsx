import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = (): React.ReactElement => {
    const footerData = {
        leftData: {
            heading: "Company",
            links: [
                { link: "Home", href: "/", id: 1 },
                { link: "About us", href: "/about", id: 2 },
                { link: "Contact us", href: "/", id: 3 },
                { link: "Privacy policy", href: "/", id: 4 },
            ]
        },
        rightData: {
            heading: "Get in touch",
            contact: [
                { contactName: "+1-234-567-890", id: 1 },
                { contactName: "contact@jamal.com", id: 2 },
            ]
        }
    }
    return (
        <footer
            className="flex flex-col mt-6 px-4"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 py-24">
                <div className="flex flex-col gap-4">
                    <Image
                        src={assets.logo}
                        alt="QuickCart logo"
                        width={100}
                        height={100}
                    />
                    <p className="text-sm text-gray-500/80 w-full max-w-xl">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        ipsum has been the industry's standard dummy text ever since th 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div className="flex-1 w-full flex gap-20 md:gap-10 md:justify-around">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-md">{footerData.leftData.heading}</h3>
                        <ul className="flex flex-col gap-3">
                            {footerData.leftData.links.map((link) => {
                                return (
                                    <Link
                                        href={link.href}
                                        key={link.id}
                                        className="text-xs text-gray-500/80 cursor-pointer hover:text-orange-600 transition-colors duration-300 w-fit"
                                    >
                                        {link.link}
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <h1 className="font-bold text-md">{footerData.rightData.heading}</h1>
                        <ul className="flex flex-col gap-2">
                            {footerData.rightData.contact.map((data) => {
                                return (
                                    <li
                                        className="w-fit text-xs text-gray-500/80 cursor-pointer hover:text-orange-600 transition-colors duration-300"
                                        key={data.id}
                                    >
                                        {data.contactName}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full border-t border-gray-200 flex-center text-gray-500/90 text-sm py-6 text-center">
                Copyright 2025 &copy; JuiceStack.dev All Right Reserved.
            </div>
        </footer>
    );
};

export default Footer;