import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
    <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
            background: `
                radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 40%),
                linear-gradient(135deg, #16283F 0%, #223A5C 50%, #2E4F7A 100%)
            `
        }}
    >
        <Head title="Log in" />

        <form
            onSubmit={submit}
            className="relative z-10 w-full max-w-md p-8
                       bg-white/10
                       backdrop-blur-xl
                       rounded-2xl
                       shadow-2xl"
        >
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-white">
                    Login User
                </h1>
                <p className="text-white/70 text-sm mt-1">
                    Silakan masuk ke akun Anda
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-400 text-center">
                    {status}
                </div>
            )}

            {/* Email */}
            <div>
                <InputLabel htmlFor="email" value="Email" className="text-white" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Masukkan Email"
                    value={data.email}
                    className="mt-1 block w-full bg-white/20 border-white/30 text-white rounded-md 
                               focus:border-blue-400 focus:ring focus:ring-blue-400 
                               focus:ring-opacity-50 placeholder-white/60"
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
                        className="mt-1 block w-full pr-10 bg-white/20 border-white/30 text-white rounded-md 
                                   focus:border-blue-400 focus:ring focus:ring-blue-400 
                                   focus:ring-opacity-50 placeholder-white/60"
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

            {/* Tombol Login */}
            <div className="mt-6">
                <PrimaryButton
                    className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                    disabled={processing}
                >
                    {processing ? 'Loading...' : 'Login'}
                </PrimaryButton>
            </div>
        </form>
    </div>
);

}
