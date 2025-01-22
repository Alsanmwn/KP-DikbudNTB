import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/loginadmin.png')" }}

        >
            <Head title="Admin Login" />

            {/* Status message */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 text-center">
                    {status}
                </div>
            )}

            {/* Form Login */}
            <form
                onSubmit={submit}
                className="w-full max-w-md p-4 "
            >
                {/* Judul */}
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Login Admin Panel
                </h1>

                {/* Input Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-white" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-white" />
                </div>

                {/* Input Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-white" />
                </div>

                {/* Tombol Login */}
                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Masuk
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}