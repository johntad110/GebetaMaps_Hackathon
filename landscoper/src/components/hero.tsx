export default function Hero({ dict }: { dict: any; }) {
    return (
        <section className="relative w-full h-screen bg-black text-white flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center rounded-3xl"
                style={{ backgroundImage: "url('/images/hero.webp')" }}>
                {/* Dark overlay to for text visibility */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-fit text-center sm:px-6 md:px-12 w-full">

                <div className="border border-white/30 p-2  overflow-hidden backdrop-blur-lg bg-gradient-to-tr from-white/30 to-amber-500/20 mb-4 px-8 sm:rounded-2xl">
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-4">
                        {dict["home"]["hero"]["title"]}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-3xl">
                    {dict["home"]["hero"]["sub-title"]}
                    </p>
                </div>

                {/* CTA Button */}
                <a href="/login" className="bg-white text-black py-3 px-8 rounded-full text-lg font-semibold transition duration-300 hover:bg-black hover:text-white">
                {dict["home"]["hero"]["cta"]}
                </a>
            </div>
        </section>
    );
}
