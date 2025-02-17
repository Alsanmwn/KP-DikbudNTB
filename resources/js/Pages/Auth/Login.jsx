// import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* Gambar logo */}
                <div className="flex justify-center items-center mb-4">
                    <img
                        src="/assets/logobtidp.png"
                        alt="Logo"
                        className="w-[150px] h-[50px] md:w-[130px] md:h-[100px] lg:w-[220px] lg:h-[120px]"
                    />
                </div>

                {/* Judul di atas email
                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        Login nama website
                    </h1>
                </div> */}

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

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-white"
                        autoComplete="current-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-white" />
                </div>

                {/* Tombol login */}
                <div className="mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Masuk
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}