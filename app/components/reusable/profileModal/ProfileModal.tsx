"use client"
import { useAppSelector, useAppDispatch } from "@/app/redux/reduxTypes";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, ChangeEvent } from "react";
import Profile from "./Profile";
import { XIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setTrigger } from "@/app/redux/triggers/triggers";
import CustomAvatar from "../CustomAvatar";
import { AuthenticationSystem } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/redux/data/profileSlice";
import LoadingSpinner from "../LoadingSpinner";

const updateProfileValidation = z.object({
  firstname: z.string().min(2, { message: "Firstname must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Lastname must be at least 2 characters" }),
  avatar: z.instanceof(File).optional().or(z.string().optional()),
})

const ProfileModal = (): React.ReactElement => {
  const { profileModal, updateProfileModal } = useAppSelector((state) => state.triggers);
  const [activeContent, setActiveContent] = useState<"Profile" | "Security">("Profile");
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { avatar, fullname } = useAppSelector((state) => state.profileInformation);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profileModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [profileModal]);

  const generateSidebarLinks = () => {
    return [
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>,
        linkName: "Profile",
        funcToExecute: () => {
          setActiveContent("Profile");
          setMobileSidebar(false);
        }
      },
    ]
  };

  const updateProfileSchema = useForm<z.infer<typeof updateProfileValidation>>({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      firstname: "",
      lastname: "",
      avatar: undefined,
    }
  });

  // Handle avatar file selection
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>, field: { onChange: (value: File) => void }) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof updateProfileValidation>) => {

    const data: FormData =  new FormData()
    if (values.avatar instanceof File) {
      data.append("avatar", values.avatar);
    }
    data.append("firstname", values.firstname);
    data.append("lastname", values.lastname);
  
    return AuthenticationSystem.updateProfile(
      router,
      (state: boolean) => dispatch(setTrigger({ key: "profileModal", value: state })),
      (state: boolean) => {
        dispatch(setTrigger({ key: "updateProfileModal", value: state }))
        updateProfileSchema.reset();
      },
      setIsUpdating,
      data,
      (data: { fullname: string, avatar: string }) => dispatch(updateProfile(data)),
    )
  };

  const closeUpdateModal = () => {
    dispatch(setTrigger({ key: "updateProfileModal", value: false }));
    setAvatarPreview(null);
    updateProfileSchema.reset();
  };

  useEffect(() => {
    if (updateProfileModal) {
      updateProfileSchema.reset({
        firstname: fullname.split(" ")[0] || "",
        lastname: fullname.split(" ")[1] || "",
        avatar: undefined,
      });
      setAvatarPreview(null);
    }
  }, [updateProfileModal, fullname, updateProfileSchema]);



  return (
    <AnimatePresence>
      {profileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          key="profile-overlay"
          className="inset-0 fixed top-0 h-full bg-black/70 flex-center z-50 lg:px-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            key="profile-modal"
            className="bg-white  lg:rounded-lg shadow-xl w-full h-full lg:max-w-5xl lg:h-[85vh]
            flex items-center relative"
          >
            {/* sidebar (desktop) */}
            <aside className="border-r border-gray-200 bg-gradient-to-b from-gray-100 via-gray-100 to-orange-100
            w-64 h-full rounded-l-lg p-4 hidden lg:block">

              {/* top section */}
              <div className="px-2">
                <h1 className="font-bold text-2xl">Account</h1>
                <p className="text-gray-400 text-sm">Manage your account info.</p>
              </div>

              {/* links */}
              <ul className="flex flex-col gap-2 mt-6">
                {generateSidebarLinks().map((link) => {
                  return (
                    <li
                      onClick={link.funcToExecute}
                      key={link.linkName}
                      className={`${activeContent === link.linkName ? "bg-gray-200" : "hover:bg-gray-200 cursor-pointer text-gray-400"} list-none flex items-center gap-4 px-4 py-2
                    font-bold text-sm rounded-lg transition-colors duration-300`}>
                      {link.icon}
                      {link.linkName}
                    </li>
                  )
                })}
              </ul>
            </aside>

            {/* sidebar (mobile + tablet) */}
            <AnimatePresence>
              {mobileSidebar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileSidebar(false)}
                  className="absolute inset-0 w-full h-full bg-black/50 rounded-tl-lg rounded-bl-lg z-50"
                >
                  <motion.aside
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="border-r border-gray-200 bg-gradient-to-b from-gray-100 via-gray-100 to-orange-100
            w-64 h-full p-4 absolute left-0 rounded-tl-lg rounded-bl-lg">

                    {/* top section */}
                    <div className="px-2">
                      <div className="flex-between">
                        <h1 className="font-bold text-2xl">Account</h1>
                        <Button
                          onClick={() => setMobileSidebar(false)}
                          variant="ghost"
                          className="cursor-pointer hover:bg-gray-200 w-7 h-7"
                        >
                          <XIcon size={16} className="text-gray-600" />
                        </Button>
                      </div>
                      <p className="text-gray-400 text-sm">Manage your account info.</p>
                    </div>

                    {/* links */}
                    <ul className="flex flex-col gap-2 mt-6">
                      {generateSidebarLinks().map((link) => {
                        return (
                          <li
                            onClick={link.funcToExecute}
                            key={link.linkName}
                            className={`${activeContent === link.linkName ? "bg-gray-200" : "hover:bg-gray-200 cursor-pointer text-gray-400"} list-none flex items-center gap-4 px-4 py-2
                    font-bold text-sm rounded-lg transition-colors duration-300`}>
                            {link.icon}
                            {link.linkName}
                          </li>
                        )
                      })}
                    </ul>
                  </motion.aside>
                </motion.div>
              )}
            </AnimatePresence>

            {/* main content */}
            <main className="flex-1 h-full overflow-hidden ">
              {activeContent === "Profile" ? (
                <Profile setTriggerSidebar={setMobileSidebar} />
              ) : null}
            </main>

            {/* update profile modal */}
            <AnimatePresence>
              {updateProfileModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full flex-center bg-black/90 z-50  lg:rounded-lg"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-md rounded-lg p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Update Profile</h2>
                      <Button
                        disabled={isUpdating}
                        variant="ghost"
                        size="icon"
                        onClick={closeUpdateModal}
                        className="h-8 w-8 cursor-pointer"
                      >
                        <XIcon size={16} />
                      </Button>
                    </div>

                    <Form {...updateProfileSchema}>
                      <form onSubmit={updateProfileSchema.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Avatar Upload Field */}
                        <FormField
                          control={updateProfileSchema.control}
                          name="avatar"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                              <FormLabel className="text-sm font-medium mb-2">Profile Picture</FormLabel>
                              <div className="relative">
                                <CustomAvatar
                                  src={avatarPreview || avatar}
                                  fallback={fullname || "User"}
                                  size="xl"
                                  className="h-24 w-24 border-2 border-gray-200"
                                />
                                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-gray-200 cursor-pointer shadow-sm hover:bg-gray-50">
                                  <Upload size={14} />
                                  <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleAvatarChange(e, field)}
                                  />
                                </label>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Fullname Field */}
                        <FormField
                          control={updateProfileSchema.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Firstname</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Change your firstname"
                                  {...field}
                                  value={field.value || ""}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Fullname Field */}
                        <FormField
                          control={updateProfileSchema.control}
                          name="lastname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lastname</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Change your lastname"
                                  {...field}
                                  value={field.value || ""}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={closeUpdateModal}
                            className="flex-1 cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            disabled={isUpdating}
                            type="submit"
                            className="flex-1 bg-orange-600 hover:bg-orange-500 cursor-pointer"
                          >
                            {isUpdating ? (
                              <LoadingSpinner size="sm"/>
                            ): "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;