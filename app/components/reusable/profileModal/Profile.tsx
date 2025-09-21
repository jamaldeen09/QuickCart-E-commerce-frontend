"use client"
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxTypes";
import { Button } from "@/components/ui/button";
import { Check, Plus, Trash2Icon, XIcon } from "lucide-react";
import React, { useState } from "react";
import CustomAvatar from "../CustomAvatar";
import { setTrigger } from "@/app/redux/triggers/triggers";
import { GoogleIcon } from "@/app/utils/icons";
import { assets } from "@/app/assets/assets";
import { NavIcon } from "../../landingPage/Navbar";
import { Actiontype } from "@/app/types/generalTypes";
import { Input } from "@/components/ui/input";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AuthenticationSystem } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { addNewEmail, switchActiveEmail, updateEmails } from "@/app/redux/data/profileSlice";
import LoadingSpinner from "../LoadingSpinner";

interface ProfileProps {
    setTriggerSidebar: Actiontype<boolean>;
}

const emailForm = z.object({
    email: z.string().email({ error: "Invalid Email address" })
})

const Profile = ({
    setTriggerSidebar
}: ProfileProps): React.ReactElement => {
    const { avatar, fullname, email, connectedAccounts } = useAppSelector((state) => state.profileInformation);
    const dispatch = useAppDispatch();
    const [addEmailAddressMode, setAddEmailAddressMode] = useState<boolean>(false);
    const [isAddingEmail, setIsAddingEmail] = useState<boolean>(false);
    const router = useRouter();
    const [deletingEmail, setDeletingEmail] = useState<string | null>(null);
    const [switchingEmail, setSwitchingEmail] = useState<string | null>(null);

    const emailSchema = useForm<z.infer<typeof emailForm>>({
        resolver: zodResolver(emailForm),
        defaultValues: {
            email: ""
        },
        mode: "onChange"
    })

    const onSubmit = (values: z.infer<typeof emailSchema>) => {
        return AuthenticationSystem.addNewEmail(
            { email: (values as { email: string }).email },
            setIsAddingEmail,
            (state: boolean) => dispatch(setTrigger({ key: "profileModal", value: state })),
            (email: string) => dispatch(addNewEmail(email)),
            router,
            () => {
                emailSchema.reset();
                setAddEmailAddressMode(false);
            }
        )
    }

    const deleteEmail = (emailToDelete: string) => {
        // Set the specific email that's being deleted
        setDeletingEmail(emailToDelete);
        
        return AuthenticationSystem.deleteSavedEmail(
            router,
            (state: boolean) => dispatch(setTrigger({ key: "profileModal", value: state })),
            (isDeleting: boolean) => {
                if (!isDeleting) {
                    setDeletingEmail(null); 
                }
            },
            { email: emailToDelete },
            (emails: string[]) => dispatch(updateEmails(emails)),
        )
    }
    const isAnyEmailDeleting = deletingEmail !== null;

    const switchPrimaryEmail = (email: string) => {
        setSwitchingEmail(email)

        return AuthenticationSystem.switchActiveEmail(
            (state: boolean) => {
                if (!state) {
                    setSwitchingEmail(null)
                }
            },
            (state: boolean) => dispatch(setTrigger({ key: "profileModal", value: state })),
            (email: string) => dispatch(switchActiveEmail(email)),
            router,
            { email }
        )
    }

    const isAnyEmailBeingSwitched = switchingEmail !== null

    return (
        <div className="h-full overflow-y-auto bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setTriggerSidebar(true)}
                        className="block p-2 transition-colors duration-200 rounded-lg lg:hidden cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        <NavIcon src={assets.menu_icon} alt="menu_icon" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Profile Details</h1>
                </div>
                <Button
                    onClick={() => dispatch(setTrigger({ key: "profileModal", value: false }))}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-100"
                >
                    <XIcon size={20} className="text-gray-500" />
                </Button>
            </div>

            <div className="p-6 space-y-8">
                {/* Profile Section */}
                <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 rounded-lg md:grid-cols-3">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-500">Update your photo and personal details</p>
                    </div>

                    <div className="flex items-center space-x-4 md:col-span-1">
                        <CustomAvatar
                            src={avatar}
                            fallback={`${fullname}'s avatar`}
                            size="lg"
                        />
                        <div>
                            <h3 className="font-medium text-gray-900 truncate max-w-[160px] text-ellipsis">{fullname}</h3>
                            <p className="text-sm text-gray-500  truncate max-w-[160px] text-ellipsis">{email.activeEmail}</p>
                        </div>
                    </div>

                    <div className="flex items-start justify-end md:col-span-1 md:justify-start">
                        <Button variant="outline" className="px-4 py-2 text-sm font-medium cursor-pointer" 
                        onClick={() => dispatch(setTrigger({ key: "updateProfileModal", value: true }))}>
                            Update Profile
                        </Button>
                    </div>
                </div>

                {/* Email Addresses Section */}
                <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 rounded-lg md:grid-cols-3">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium text-gray-900">Email Addresses</h3>
                        <p className="mt-1 text-sm text-gray-500">Manage your email addresses</p>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                        {/* Primary Email */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-2">
                                <p className="text-gray-900">{email.activeEmail}</p>
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    Primary
                                </span>
                            </div>
                        </div>

                        {/* Other Emails */}
                        {email.otherEmails.length > 0 && (
                            <div className="space-y-3">
                                {email.otherEmails.map((emailItem) => (
                                    <div key={emailItem} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-sm text-gray-700">{emailItem}</p>
                                        <div className="flex items-center space-x-3">
                                            <button 
                                                onClick={() => switchPrimaryEmail(emailItem)}
                                                className={`text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer`}
                                                disabled={isAnyEmailBeingSwitched ||  isAnyEmailDeleting}
                                            >
                                               {switchingEmail === emailItem ? (
                                                 "Updating..."
                                               ): "Make primary"}
                                            </button>
                                            <button 
                                              onClick={() => deleteEmail(emailItem)}
                                              disabled={isAnyEmailDeleting} 
                                              className={`p-1 text-red-600 transition-colors rounded-md hover:bg-red-50 ${isAnyEmailDeleting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>

                                                {deletingEmail === emailItem ? (
                                                    <div className="w-4 h-4">
                                                        <svg aria-hidden="true" className="w-4 h-4 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : <Trash2Icon size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add Email Form */}
                        <Form {...emailSchema}>
                            {addEmailAddressMode ? (
                                <form onSubmit={emailSchema.handleSubmit(onSubmit)} className="flex items-start space-x-3">
                                    <div className="flex-1">
                                        <FormField
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter email address"
                                                                className="pr-10"
                                                                disabled={isAddingEmail || isAnyEmailDeleting} 
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAddEmailAddressMode(false);
                                                                    emailSchema.reset();
                                                                }}
                                                                disabled={isAddingEmail || isAnyEmailDeleting} 
                                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                                                            >
                                                                <XIcon size={16} />
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs text-red-600" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isAddingEmail || !emailSchema.formState.isValid || isAnyEmailDeleting} 
                                        className="bg-orange-600 hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {isAddingEmail ? (
                                            <LoadingSpinner size="sm" />
                                        ) : (
                                            <Check size={16} />
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => setAddEmailAddressMode(true)}
                                    className="flex items-center space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={isAnyEmailDeleting} 
                                >
                                    <Plus size={16} />
                                    <span>Add email address</span>
                                </Button>
                            )}
                        </Form>
                    </div>
                </div>

                {/* Connected Accounts Section */}
                <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 rounded-lg md:grid-cols-3">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium text-gray-900">Connected Accounts</h3>
                        <p className="mt-1 text-sm text-gray-500">Manage your connected accounts</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 md:col-span-2">
                        {connectedAccounts.length <= 0 ? <p className="text-gray-600 text-sm">No connected accounts</p>: (
                            <div className="flex items-center space-x-3">
                                <GoogleIcon />
                                <div>
                                    <p className="font-medium text-gray-900">Google</p>
                                    <p className="text-sm text-gray-500">{email.activeEmail}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;