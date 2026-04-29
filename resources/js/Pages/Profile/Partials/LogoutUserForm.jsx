import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

export default function LogoutUserForm({ className }) {
    const [confirmingLogout, setConfirmingLogout] = useState(false);

    const {
        post,
        processing,
        errors,
    } = useForm();

    const confirmLogout = () => {
        setConfirmingLogout(true);
    };

    const logoutUser = (e) => {
        e.preventDefault();

        post(route('logout'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingLogout(false);
    };

    return (
        <section className={`space-y-6 ${className}`}>
            
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Keluar Akun
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Anda akan keluar dari sesi saat ini. Pastikan semua pekerjaan sudah disimpan sebelum logout.
                </p>
            </header>

            <DangerButton onClick={confirmLogout}>
                Log Out
            </DangerButton>

            {/* MODAL */}
            <Modal show={confirmingLogout} onClose={closeModal}>
                <form onSubmit={logoutUser} className="p-6">

                    <h2 className="text-lg font-medium text-gray-900">
                        Yakin ingin keluar?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Anda akan keluar dari akun ini dan harus login kembali untuk mengakses dashboard.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            {processing ? 'Memproses...' : 'Log Out'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
