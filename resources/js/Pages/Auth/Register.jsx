import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #16283F 0%, #223A5C 50%, #2E4F7A 100%)"
            }}
        >
            <Head title="Register" />

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
                        Register User
                    </h1>
                    <p className="text-white/70 text-sm mt-1">
                        Silakan buat akun baru
                    </p>
                </div>

                {/* Nama */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-white" />
                    <TextInput
                        id="name"
                        name="name"
                        placeholder="Masukkan Nama Lengkap"
                        value={data.name}
                        className="mt-1 block w-full bg-white/20 border-white/30 text-white rounded-md 
                                focus:border-blue-400 focus:ring focus:ring-blue-400 
                                focus:ring-opacity-50 placeholder-white/60"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-red-300" />
                </div>

                {/* Email */}
                <div className="mt-4">
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
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-red-300" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />
                    
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Masukkan Password"
                            value={data.password}
                            className="mt-1 block w-full pr-10 bg-white/20 border-white/30 text-white rounded-md 
                                    focus:border-blue-400 focus:ring focus:ring-blue-400 
                                    focus:ring-opacity-50 placeholder-white/60"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-white transition duration-200"
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

                {/* Konfirmasi Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="text-white" />
                    
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            placeholder="Konfirmasi Password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full pr-10 bg-white/20 border-white/30 text-white rounded-md 
                                    focus:border-blue-400 focus:ring focus:ring-blue-400 
                                    focus:ring-opacity-50 placeholder-white/60"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-black transition duration-200"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEye size={20} />
                            ) : (
                                <AiOutlineEyeInvisible size={20} />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2 text-red-300" />
                </div>

                {/* Tombol */}
                <div className="mt-6">
                    <PrimaryButton
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                        disabled={processing}
                    >
                        {processing ? 'Loading...' : 'Register'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
