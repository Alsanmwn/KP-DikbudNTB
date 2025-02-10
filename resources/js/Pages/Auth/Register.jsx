import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Gambar logo */}
                <div className="flex items-center mb-4">
                    <img
                        src="/assets/logocontoh.jpg"
                        alt="Logo"
                        className="h-90 w-25"
                    />
                </div>

                {/* Judul di atas form */}
                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        Register nama website
                    </h1>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" className="text-white" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-white" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-white" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="username"
                        onChange={handleOnChange}
                        required
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
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-white" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-gray-800 border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-white" />
                </div>

                {/* Tombol register */}
                <div className="mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
