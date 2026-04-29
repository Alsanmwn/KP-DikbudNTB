import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AdminLogin({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [showSuccess]);

    const submit = (e) => {
        e.preventDefault();

        post('/admin/login', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setShowSuccess(true);
                setProgress(0);
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 2000);
            },
            onError: () => {
                setShowError(true);
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/assets/loginadmin.png')" }}
        >
            <Head title="Admin Login" />

            <div className="absolute inset-0 bg-black/30"></div>

            {/* Login */}
            <form
                onSubmit={submit}
                className="relative z-10 w-full max-w-md p-8
                           bg-white/10
                           w-[350px] 
                           h-[350px] 
                           backdrop-blur-md
                           rounded-2xl
                           shadow-2xl"
            >
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-400 text-center">
                        {status}
                    </div>
                )}

                <h1 className="text-2xl font-bold text-white text-center mt-2 mb-6">
                    Login Admin
                </h1>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-white" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Masukkan Email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/20 border-white/30 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-white/70"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-300" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"} // ✅ toggle
                            name="password"
                            placeholder="Masukkan Password"
                            value={data.password}
                            className="mt-1 block w-full pr-10 bg-white/20 border-white/30 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-white/70"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-black transition duration-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <AiOutlineEye size={20} />          
                            ) : (
                                <AiOutlineEyeInvisible size={20} /> 
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2 text-red-300" />
                </div>

                {/* Button */}
                <div className="mt-6">
                    <PrimaryButton
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                </div>
            </form>

            {/* POPUP SUCCESS */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-[350px] p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 border-4 border-green-300">
                                <svg
                                    className="w-10 h-10 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            Login Berhasil!
                        </h2>

                        <p className="text-gray-600 text-sm mb-5">
                            Selamat datang, Admin
                        </p>

                        <div className="w-full h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
                            <div
                                className="h-2 bg-green-500 rounded-full transition-all duration-75"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <p className="text-gray-400 text-sm">
                            Mengarahkan ke dashboard...
                        </p>
                    </div>
                </div>
            )}

            {/* POPUP ERROR */}
            {showError && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[350px] p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
                                <span className="text-red-600 text-3xl font-bold">×</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Login Gagal!
                        </h2>

                        <p className="text-gray-500 text-sm mb-4">
                            Username atau password salah
                        </p>

                        <div className="w-full h-1 bg-gray-200 rounded mb-4">
                            <div className="h-1 bg-red-500 rounded w-full"></div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">
                            Silakan coba lagi...
                        </p>

                        <button
                            onClick={() => setShowError(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
