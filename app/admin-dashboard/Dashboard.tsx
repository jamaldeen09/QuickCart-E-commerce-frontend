"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../components/landingPage/Navbar";
import SideBar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import { getDashboardData, handleFetch } from "../redux/data/adminDataSlice";
import { DashboardPayload } from "../../../server/src/types/authTypes";
import { AdminSystem } from "../api/admin";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { setTrigger } from "../redux/triggers/triggers";
import LoadingSpinner from "../components/reusable/LoadingSpinner";


const Dashboard = ({ children }: { children: React.ReactNode }): React.ReactElement | null => {
    const dispatch = useAppDispatch()
    const handleFetchingState = (state: boolean) => dispatch(handleFetch(state));
    const fetchDashboardData = (data: DashboardPayload) => dispatch(getDashboardData(data));
    const router = useRouter();
    const adminSystem: AdminSystem = new AdminSystem(router);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null = checking, true = admin, false = not admin
    const { role } = useAppSelector((state) => state.profileInformation);

    useEffect(() => {
        if (role !== "admin") {
            setIsAdmin(false);
            router.push("/"); 
            return;
        }

        setIsAdmin(true);
        adminSystem.fetchDashboardData(
            handleFetchingState,
            fetchDashboardData,
        );
    }, [role, router, adminSystem, fetchDashboardData, handleFetchingState]);

    // Show nothing while checking permissions
    if (isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Show nothing if not admin (will redirect)
    if (!isAdmin) {
        return null;
    }

    return (
        <div>
            <Navbar />
            {/* dashboard area */}
            <div className="flex items-center h-screen">
                <SideBar />
                <main className="flex-1 h-full flex flex-col">
                    <div className="block md:hidden p-2">
                        <button
                            onClick={() => dispatch(setTrigger({ key: "adminDashboardSidebar", value: true }))}
                            className="cursor-pointer hover:bg-gray-50 transition-colors duration-300 p-2 rounded-lg">
                            <Menu size={20} />
                        </button>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;