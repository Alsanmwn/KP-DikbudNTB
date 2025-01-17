export default function GuestLayout({ children }) {
    return (
        <div 
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{ backgroundImage: 'url("/assets/backgroundlogin.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-pink-500" />
                </Link>
            </div> */}

            <div className="mt-6 w-full overflow-hidden bg-[#223A5C] bg-opacity-40 px-6 py-8 shadow-md sm:max-w-md sm:rounded-[20px] border-2 border-white">
                {children}
            </div>
        </div>
    );
}