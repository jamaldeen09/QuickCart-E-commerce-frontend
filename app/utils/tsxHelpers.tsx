import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getDetails = (auth: string): React.ReactElement | null => {
    if (auth === "register") {
        return (
            <>
                <h1 className="font-extrabold text-2xl text-gray-800 mb-2">Create Your Account</h1>
                <p className="text-gray-600 text-sm">
                    Join thousands of shoppers enjoying exclusive deals and faster checkout
                </p>
            </>
        );
    } else if (auth === "login") {
        return (
            <>
                <h1 className="font-bold text-3xl text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600 text-sm">
                Sign in to QuickCart E-commerce
                </p>
            </>
        );
    } else if (auth === "password-reset") {
        return (
            <>
                <h1 className="font-bold text-3xl text-gray-800 mb-2">Reset Your Password</h1>
                <p className="text-gray-600 text-sm">
                    Enter your email address and we'll send you instructions to reset your password
                </p>
            </>
        );
    } else if (auth === "change-password") {
        return (
            <>
                <h1 className="font-bold text-3xl text-gray-800 mb-2">Update Password</h1>
                <p className="text-gray-600 text-sm">
                    Create a new strong password to keep your account secure
                </p>
            </>
        );
    } else if (auth === "otp-verification") {
        return (
            <>
                <h1 className="font-bold text-3xl text-gray-800 mb-2">Verify Your Identity</h1>
                <p className="text-gray-600 text-sm">
                    Enter the verification code sent to your email to secure your account
                </p>
            </>
        );
    }

    return null;
};

export const getFieldDetails = (auth: string) => {
    if (auth === "register") {
        return [
            { name: "firstname", label: "Firstname", placeholder: "John", type: "text" },
            { name: "lastname", label: "Lastname", placeholder: "Doe", type: "text" },
            { name: "email", label: "Email Address", placeholder: "example@email.com", type: "email" },
            { name: "password", label: "Password", placeholder: "Create a strong password", type: "password" },
        ];
    } else if (auth === "login") {
        return [
            { name: "email", label: "Email Address", placeholder: "example@email.com", type: "email" },
            { name: "password", label: "Password", placeholder: "Password", type: "password" },
        ];
    } else if (auth === "password-reset") {
        return [
            { name: "email", label: "Email Address", placeholder: "example@email.com", type: "email" },
        ];
    } else if (auth === "change-password") {
        return [
            { name: "newPassword", label: "New Password", placeholder: "Create a strong password", type: "password" },
            { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm your password", type: "password" },
        ];
    } else if (auth === "otp-verification") {
        return [
            { name: "otp", label: "Verification Code", placeholder: "Enter 6-digit code", type: "text" },
        ];
    }
    return [];
};

export const getLink = (auth: string, router: AppRouterInstance, isLoading: boolean
    , isResending: boolean, resendOtp: () => Promise<void>, pathname: string, id: string,
) => {

    return (
        <p>
            {auth === "register" ? (
                "Already have an account? "
            ) : auth === "login" ? (
                "Dont have an account? "
            ) : auth === "password-reset" ? "Remember your password? " : auth === "otp-verification" ? "Didn't get the code? " : ""}
            <span
                onClick={() => {
                    if (auth === "register" || auth === "password-reset") {
                        return router.push(`${pathname}${id ? `?id=${id}&auth=login` : `?auth=login`}`)
                    } else if (auth === "login") {
                        return router.push(`${pathname}${id ? `?id=${id}&auth=register` : `?auth=register`}`)
                    } else if (auth === "otp-verification") {
                        return resendOtp();
                    }
                }}
                className={`${isResending ? "text-gray-800 brightness-75 cursor-not-allowed" : "text-blue-600 "} transition-all duration-300
                        ${isLoading ? "cursor-not-allowed brightness-75" : "cursor-pointer hover:brightness-75"}`}
            >
                {auth === "register" || auth === "password-reset" ? "sign in" : auth === "login" ? "sign up" : auth === "otp-verification" ? (
                    <span
                        className={`${isResending && "cursor-not-allowed"}`}
                    >
                        {isResending ? "resending ..." : "resend otp"}
                    </span>
                ) : ""}
            </span>
        </p>
    )
}
