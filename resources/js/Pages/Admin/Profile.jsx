import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Sidebar from "@/Components/Sidebar";
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Profile = () => {
  const { admin } = usePage().props;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        },
      });
    }, Math.random() * 1000 + 1000);
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Ubah Profil
              </h1>
            </div>
          </div>
        </nav>

        <div className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-8">
                {recentlySuccessful && (
                  <div className="mb-6 text-sm text-green-600 font-semibold">
                    Profil berhasil diperbarui.
                  </div>
                )}

                <form onSubmit={handleUpdateClick} className="space-y-6">
                  {/* Nama */}
                  <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                    <TextInput
                      id="name"
                      type="text"
                      className="mt-1 block w-full !bg-gray-50"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  {/* Email */}
                  <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                      id="email"
                      type="email"
                      className="mt-1 block w-full !bg-gray-50"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      required
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  {/* Password Saat Ini */}
                  <div>
                    <InputLabel
                      htmlFor="current_password"
                      value="Password Saat Ini"
                    />
                    <div className="relative">
                      <TextInput
                        id="current_password"
                        type={showCurrentPassword ? "text" : "password"}
                        className="mt-1 block w-full !bg-gray-50 pr-10"
                        value={data.current_password}
                        onChange={(e) =>
                          setData("current_password", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </button>
                    </div>
                    <InputError
                      message={errors.current_password}
                      className="mt-2"
                    />
                  </div>

                  {/* Password Baru */}
                  <div>
                    <InputLabel htmlFor="password" value="Password Baru" />
                    <div className="relative">
                      <TextInput
                        id="password"
                        type={showNewPassword ? "text" : "password"}
                        className="mt-1 block w-full !bg-gray-50 pr-10"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Masukkan password baru"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  {/* Konfirmasi Password */}
                  <div>
                    <InputLabel
                      htmlFor="password_confirmation"
                      value="Konfirmasi Password"
                    />
                    <div className="relative">
                      <TextInput
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        className="mt-1 block w-full !bg-gray-50 pr-10"
                        value={data.password_confirmation}
                        onChange={(e) =>
                          setData("password_confirmation", e.target.value)
                        }
                        placeholder="Konfirmasi password baru anda"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </button>
                    </div>
                    <InputError
                      message={errors.password_confirmation}
                      className="mt-2"
                    />
                  </div>

                  {/* Button */}
                  <div className="flex justify-end gap-2 mt-6"> 
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md"
                      disabled={processing || isLoading}
                    >
                      {isLoading ? "Memproses..." : "Perbarui Profil"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Konfirmasi */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fadeIn">
            
            <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />

            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Konfirmasi Perubahan
            </h2>

            <p className="text-gray-600 mb-5">
              Yakin ingin memperbarui profil?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={cancelUpdate}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>

              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg text-center">
            <AiOutlineCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
            <h2 className="font-bold text-lg">Berhasil</h2>
            <p>Password berhasil diperbarui</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
