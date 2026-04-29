import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import LogoutUserForm from './Partials/LogoutUserForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import RiwayatPermohonan from './Partials/RiwayatPermohonan';
import RiwayatPendaftaran from './Partials/RiwayatPendaftaran';
import { Head, usePage  } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { permohonan_layanan, pendaftaran_kegiatan } = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* ── Riwayat Permohonan Layanan ── */}
                    <RiwayatPermohonan data={permohonan_layanan ?? []} />

                    {/* ── Riwayat Pendaftaran Kegiatan ── */}
                    <RiwayatPendaftaran data={pendaftaran_kegiatan ?? []} />

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <LogoutUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
