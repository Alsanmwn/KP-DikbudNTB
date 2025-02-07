import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Sidebar from "@/Components/Sidebar";
import { AiOutlineExclamationCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Profile = () => {
  const { admin } = usePage().props;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: admin.name,
      email: admin.email,
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setShowConfirmationPopup(true);
  };

  const confirmUpdate = () => {
    setIsLoading(true);
    setShowConfirmationPopup(false);

    // Simulate loading time before making the request
    setTimeout(() => {
      patch("/admin/profile-update", {
        preserveScroll: true,
        onSuccess: () => {
          setShowSuccessPopup(true);
          setData({
            name: admin.name,
            email: admin.email,
            current_password: "",
            password: "",
            password_confirmation: "",
          });
          setIsLoading(false);
        },
        onError: () => {
          setData({
            ...data,
            current_password: "",
            password: "",
            password_confirmation: "",
          });
          setIsLoading(false);
        }
      });
    }, Math.random() * 1000 + 1000); // Random loading time between 1-2 seconds
  };

  const cancelUpdate = () => {
    setData({
      name: admin.name,
      email: admin.email,
      current_password: "",
      password: "",
      password_confirmation: "",
    });
    setShowConfirmationPopup(false);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar />

      <div className="flex-1">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-blue-600">Ubah Profil</h1>
            </div>
          </div>
        </nav>

        <div className="py-12">
          <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-8">
                {recentlySuccessful && (
                  <div className="mb-6 text-sm text-green-600 font-semibold">
                    Profil berhasil diperbarui.
                  </div>
                )}

                <form onSubmit={handleUpdateClick} className="space-y-8">
                  {/* Kolom Nama */}
                  <div>
                    <InputLabel
                      htmlFor="name"
                      value="Nama Lengkap"
                      className="text-gray-700"
                    />
                    <TextInput
                      id="name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                      autoComplete="name"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                    <InputError
                      message={errors.name}
                      className="mt-2 text-red-500"
                    />
                  </div>

                  {/* Kolom Email */}
                  <div>
                    <InputLabel
                      htmlFor="email"
                      value="Alamat Email"
                      className="text-gray-700"
                    />
                    <TextInput
                      id="email"
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="Masukkan alamat email Anda"
                    />
                    <InputError
                      message={errors.email}
                      className="mt-2 text-red-500"
                    />
                  </div>

                  {/* Kolom Password Saat Ini */}
                  <div>
                    <InputLabel
                      htmlFor="current_password"
                      value="Password Saat Ini"
                      className="text-gray-700"
                    />
                    <div className="relative">
                      <TextInput
                        id="current_password"
                        type={showCurrentPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={data.current_password}
                        onChange={(e) =>
                          setData("current_password", e.target.value)
                        }
                        placeholder="Masukkan password saat ini"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? "Sembunyikan" : "Tampilkan"}
                      </button>
                    </div>
                    <InputError
                      message={errors.current_password}
                      className="mt-2 text-red-500"
                    />
                  </div>

                  {/* Kolom Password Baru */}
                  <div>
                    <InputLabel
                      htmlFor="password"
                      value="Password Baru"
                      className="text-gray-700"
                    />
                    <div className="relative">
                      <TextInput
                        id="password"
                        type={showNewPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Masukkan password baru"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? "Sembunyikan" : "Tampilkan"}
                      </button>
                    </div>
                    <InputError
                      message={errors.password}
                      className="mt-2 text-red-500"
                    />
                  </div>

                  {/* Kolom Konfirmasi Password Baru */}
                  <div>
                    <InputLabel
                      htmlFor="password_confirmation"
                      value="Konfirmasi Password Baru"
                      className="text-gray-700"
                    />
                    <TextInput
                      id="password_confirmation"
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                      }
                      placeholder="Konfirmasi password baru Anda"
                    />
                    <InputError
                      message={errors.password_confirmation}
                      className="mt-2 text-red-500"
                    />
                  </div>

                  {/* Tombol Submit */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      disabled={processing || isLoading}
                    >
                      {isLoading ? "Memperbarui..." : "Perbarui Profil"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {/* Pop-up konfirmasi */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <div className="flex flex-col items-center text-center">
              <AiOutlineExclamationCircle
                className="text-red-500 text-5xl mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">
                Konfirmasi Pembaruan!
              </h2>
              <p className="text-gray-600 mt-1 ">
                Apakah Anda yakin ingin memperbarui password Anda?
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={cancelUpdate}
                >
                  Batalkan
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={confirmUpdate}
                >
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-400 p-3 rounded-full mb-4">
                <AiOutlineCheckCircle className="text-white text-5xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Successfully
              </h2>
              <p className="text-gray-600">
                Kami telah berhasil memperbarui kata sandi Anda. Jaga
                kerahasiaannya untuk melindungi akun Anda
              </p>
              <button
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-[30px] hover:bg-red-700"
                onClick={handleCloseSuccessPopup}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;