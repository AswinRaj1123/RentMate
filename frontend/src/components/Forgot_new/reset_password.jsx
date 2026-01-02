import React, { useState, useEffect } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent2 from "../../assets/rentme-logo-transparent-1.png";
import { API_BASE_URL } from "../../config";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get email and otp from navigation state
    const email = location.state?.email;
    const otp = location.state?.otp;

    // Redirect if no email or otp is provided
    useEffect(() => {
        if (!email || !otp) {
            navigate("/forgot-password");
        }
    }, [email, otp, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        // Validate passwords
        if (!password) {
            setError("Please enter a new password");
            return;
        }

        if (!confirmPassword) {
            setError("Please confirm your password");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email, 
                    otp, 
                    newPassword: password, 
                    confirmPassword 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - show success message and redirect to login
                alert("Password reset successfully! You can now sign in with your new password.");
                navigate("/login");
            } else {
                setError(data.error || "Failed to reset password");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white grid justify-items-center [align-items:start] w-screen">
            <div className="bg-white w-[1512px] h-[982px] relative">
                <div className="flex flex-col w-[390px] items-start gap-8 px-4 py-0 absolute top-[316px] left-[561px]">
                    <div className="relative w-[358px] h-[310px]">
                        <div className="w-[358px] items-center gap-3 absolute top-0 left-0 flex flex-col">
                            <div className="relative self-stretch mt-[-1.00px] font-title-screen font-[number:var(--title-screen-font-weight)] text-slate-800 text-[length:var(--title-screen-font-size)] text-center tracking-[var(--title-screen-letter-spacing)] leading-[var(--title-screen-line-height)] [font-style:var(--title-screen-font-style)]">
                                Create New Password
                            </div>

                            <div className="items-center relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                                <p className="relative self-stretch mt-[-1.00px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-600 text-[length:var(--body-default-font-size)] text-center tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]">
                                    Please enter and confirm your new password.
                                </p>

                                <p className="relative self-stretch font-body-default font-[number:var(--body-default-font-weight)] text-slate-600 text-[length:var(--body-default-font-size)] text-center tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]">
                                    You will need to login after you reset.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleResetPassword} className="w-[358px] items-start gap-3 absolute top-[122px] left-0 flex flex-col">
                            <div className="flex flex-col w-[358px] items-end gap-1.5 relative flex-[0_0_auto]">
                                <div className="flex items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                    <div className="relative w-fit mt-[-1.00px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] whitespace-nowrap [font-style:var(--body-default-font-style)]">
                                        Password
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border-[1.5px] border-solid border-slate-200">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="relative flex-1 mt-[-1.50px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)] bg-transparent border-none outline-none placeholder:text-slate-400"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <FiEye className="!relative !w-5 !h-5 text-slate-500" />
                                        ) : (
                                            <FiEyeOff className="!relative !w-5 !h-5 text-slate-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col w-[358px] items-end gap-1.5 relative flex-[0_0_auto]">
                                <div className="flex items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                    <div className="relative w-fit mt-[-1.00px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] whitespace-nowrap [font-style:var(--body-default-font-style)]">
                                        Confirm Password
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border-[1.5px] border-solid border-slate-200">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="relative flex-1 mt-[-1.50px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)] bg-transparent border-none outline-none placeholder:text-slate-400"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <FiEye className="!relative !w-5 !h-5 text-slate-500" />
                                        ) : (
                                            <FiEyeOff className="!relative !w-5 !h-5 text-slate-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Error message */}
                        {error && (
                            <div className="absolute top-[280px] left-0 w-[358px] text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                <img
                    className="absolute w-52 h-52 top-[55px] left-[652px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogoTransparent2}
                />

                <button 
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="all-[unset] box-border flex w-[479px] items-start absolute top-[781px] left-[516px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="flex items-center justify-center gap-2 px-3.5 py-3 relative flex-1 grow bg-[#2b8761] rounded-full overflow-hidden">
                        <div className="relative w-fit mt-[-2.00px] font-title-group font-[number:var(--title-group-font-weight)] text-white text-[length:var(--title-group-font-size)] text-center tracking-[var(--title-group-letter-spacing)] leading-[var(--title-group-line-height)] whitespace-nowrap [font-style:var(--title-group-font-style)]">
                            {loading ? "Resetting Password..." : "Reset Password"}
                        </div>
                    </div>
                </button>

                <img
                    className="absolute w-[389px] h-[393px] top-[589px] left-[1123px] aspect-[1] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign1}
                />
            </div>
        </div>
    );
};