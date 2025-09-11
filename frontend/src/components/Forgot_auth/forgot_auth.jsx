import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginBackgroundDesign1 from "../../assets/login-background-design-1.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";

export const ForgetAuth = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get email from navigation state
    const email = location.state?.email || "your-email@example.com";

    // Redirect to forgot-password if no email is provided
    useEffect(() => {
        if (!location.state?.email) {
            navigate("/forgot-password");
        }
    }, [location.state, navigate]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        // Validate OTP
        if (!otp) {
            setError("Please enter the 4-digit code");
            return;
        }

        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit code");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Call the verify OTP API
            const response = await fetch("http://localhost:3000/api/verify-reset-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - redirect to reset password page
                navigate("/reset-password", { state: { email, otp } });
            } else {
                setError(data.error || "Invalid or expired code");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResendLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/resend-reset-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("New code sent successfully!");
            } else {
                setError(data.error || "Failed to resend code");
            }
        } catch (error) {
            console.error("Error resending code:", error);
            setError("Network error. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="bg-white grid justify-items-center [align-items:start] w-screen">
            <div className="bg-white w-[1512px] h-[982px] relative">
                <img
                    className="absolute w-52 h-52 top-12 left-[652px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogoTransparent1}
                />

                <img
                    className="absolute w-[421px] h-[323px] top-[659px] left-[1091px] aspect-[1] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign1}
                />

                <div className="w-[554px] h-[257px] items-start gap-8 px-4 py-0 absolute top-[327px] left-[479px] flex flex-col">
                    <div className="items-center gap-3 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                        <div className="relative self-stretch mt-[-1.00px] font-title-screen font-[number:var(--title-screen-font-weight)] text-slate-800 text-[length:var(--title-screen-font-size)] text-center tracking-[var(--title-screen-letter-spacing)] leading-[var(--title-screen-line-height)] [font-style:var(--title-screen-font-style)]">
                            Verify Account
                        </div>

                        <div className="items-center relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                            <p className="relative self-stretch mt-[-1.00px] [font-family:'Gabarito-Regular',Helvetica] font-normal text-transparent text-sm text-center leading-[22px]">
                                <span className="text-slate-600 tracking-[var(--body-default-letter-spacing)] font-body-default [font-style:var(--body-default-font-style)] font-[number:var(--body-default-font-weight)] leading-[var(--body-default-line-height)] text-[length:var(--body-default-font-size)]">
                                    Code has been send to{" "}
                                </span>

                                <span className="font-body-default-bold font-[number:var(--body-default-bold-font-weight)] text-slate-800 tracking-[var(--body-default-bold-letter-spacing)] [font-style:var(--body-default-bold-font-style)] leading-[var(--body-default-bold-line-height)] text-[length:var(--body-default-bold-font-size)]">
                                    {email}
                                </span>

                                <span className="text-slate-600 tracking-[var(--body-default-letter-spacing)] font-body-default [font-style:var(--body-default-font-style)] font-[number:var(--body-default-font-weight)] leading-[var(--body-default-line-height)] text-[length:var(--body-default-font-size)]">
                                    .
                                </span>
                            </p>

                            <p className="relative self-stretch font-body-default font-[number:var(--body-default-font-weight)] text-slate-600 text-[length:var(--body-default-font-size)] text-center tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]">
                                Enter the code to verify your account.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="flex flex-col items-end gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                        <header className="flex items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
                            <div className="relative w-fit mt-[-1.00px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] whitespace-nowrap [font-style:var(--body-default-font-style)]">
                                Enter Code
                            </div>
                        </header>

                        <input
                            className="flex items-center justify-center gap-2 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border-[1.5px] border-solid border-slate-200 font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]"
                            placeholder="4 Digit Code"
                            type="text"
                            maxLength="4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            required
                        />
                    </form>

                    {/* Error message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center mt-2">
                            {error}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="all-[unset] box-border flex w-[480px] items-start absolute top-[725px] left-[516px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="flex items-center justify-center gap-2 px-3.5 py-3 relative flex-1 grow bg-[#2b8761] rounded-full overflow-hidden">
                        <div className="relative w-fit mt-[-2.00px] font-title-group font-[number:var(--title-group-font-weight)] text-white text-[length:var(--title-group-font-size)] text-center tracking-[var(--title-group-letter-spacing)] leading-[var(--title-group-line-height)] whitespace-nowrap [font-style:var(--title-group-font-style)]">
                            {loading ? "Verifying..." : "Verify Account"}
                        </div>
                    </div>
                </button>

                <button 
                    onClick={handleResendCode}
                    disabled={resendLoading}
                    className="absolute w-[327px] h-12 top-[795px] left-[592px] rounded-[48px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="absolute h-4 top-[15px] left-[114px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-blue-600 text-[length:var(--regular-none-medium-font-size)] text-center tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
                        {resendLoading ? "Resending..." : "Resend code"}
                    </div>
                </button>
            </div>
        </div>
    );
};