import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBackgroundDesign2 from "../../assets/login-background-design-2.png";
import rentmeLogoTransparent1 from "../../assets/rentme-logo-transparent-1.png";
import { API_BASE_URL } from "../../config";

export const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSendResetInstruction = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Use backend email from response
                navigate("/forgot-auth", { state: { email: data.email } });
            } else {
                setError(data.error || "Failed to send reset instruction");
            }
        } catch (error) {
            console.error("Error sending reset instruction:", error);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f5f7fa] grid justify-items-center [align-items:start] w-screen">
            <div className="bg-[#f5f7fa] w-[1512px] h-[982px] relative">
                <img
                    className="absolute w-[407px] h-[343px] top-[639px] left-[1105px] aspect-[1] object-cover"
                    alt="Login background"
                    src={loginBackgroundDesign2}
                />

                <img
                    className="absolute w-52 h-52 top-12 left-[652px] aspect-[1] object-cover"
                    alt="Rentme logo"
                    src={rentmeLogoTransparent1}
                />

                <div className="w-[621px] h-[251px] items-start gap-8 px-4 py-0 absolute top-[329px] left-[445px] flex flex-col">
                    <div className="items-center gap-3 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                        <div className="relative self-stretch mt-[-1.00px] font-title-screen font-[number:var(--title-screen-font-weight)] text-slate-800 text-[length:var(--title-screen-font-size)] text-center tracking-[var(--title-screen-letter-spacing)] leading-[var(--title-screen-line-height)] [font-style:var(--title-screen-font-style)]">
                            Forgot Password
                        </div>

                        <p className="relative self-stretch font-body-default font-[number:var(--body-default-font-weight)] text-slate-600 text-[length:var(--body-default-font-size)] text-center tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]">
                            No worries! Enter your email address below and we will send you a
                            code to reset password.
                        </p>
                    </div>

                    <form onSubmit={handleSendResetInstruction} className="flex flex-col items-end gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                        <header className="flex items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
                            <div className="relative w-fit mt-[-1.00px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] whitespace-nowrap [font-style:var(--body-default-font-style)]">
                                E-mail
                            </div>
                        </header>

                        <input
                            className="px-4 py-3 relative self-stretch w-full bg-white rounded-lg overflow-hidden border-[1.5px] border-solid border-slate-200 flex-1 mt-[-1.50px] font-body-default font-[number:var(--body-default-font-weight)] text-slate-800 text-[length:var(--body-default-font-size)] tracking-[var(--body-default-letter-spacing)] leading-[var(--body-default-line-height)] [font-style:var(--body-default-font-style)]"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </form>

                    {error && (
                        <div className="text-red-500 text-sm text-center mt-2">
                            {error}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleSendResetInstruction}
                    disabled={loading}
                    className="all-[unset] box-border flex w-[461px] items-start absolute top-[729px] left-[525px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="flex items-center justify-center gap-2 px-3.5 py-3 relative flex-1 grow bg-[#2b8761] rounded-full overflow-hidden">
                        <div className="relative w-fit mt-[-2.00px] font-title-group font-[number:var(--title-group-font-weight)] text-white text-[length:var(--title-group-font-size)] text-center tracking-[var(--title-group-letter-spacing)] leading-[var(--title-group-line-height)] whitespace-nowrap [font-style:var(--title-group-font-style)]">
                            {loading ? "Sending..." : "Send Reset Instruction"}
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};