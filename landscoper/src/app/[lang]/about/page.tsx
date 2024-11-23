
import React from "react";
import { getDictionary } from "../dictionaries";

interface AboutProp {
    params: {
        lang: string
    }
}

export default async function ({ params: { lang } }: any) {
    const dict = await getDictionary(lang)

    return (
        <div className="bg-black text-white font-[family-name:var(--font-funnel-display)] p-8 pb-20 gap-16 sm:p-20 mb-64">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    {dict["about"]["hero"]["headline"]}
                </h1>
                <p className="text-lg md:text-xl text-gray-400">
                    {dict["about"]["hero"]["subheadline"]}.
                </p>
            </section>

            {/* Mission Statement */}
            <section className="py-16 px-4 text-center">
                <p className="text-xl md:text-2xl text-gray-300 mx-auto max-w-3xl">
                    {dict["about"]["mission"]["content"]}
                </p>
            </section>

            {/* The Team */}
            <section className="py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-amber-300">{dict["about"]["team"]["title"]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Team Member */}
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-green-700"></div>
                        <h3 className="text-xl font-semibold">{dict["about"]["team"]["john"]["name"]}</h3>
                        <p className="text-gray-400">{dict["about"]["team"]["john"]["role"]}</p>
                        <p className="text-gray-500 mt-2">{dict["about"]["team"]["john"]["fact"]}</p>
                    </div>

                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-yellow-700"></div>
                        <h3 className="text-xl font-semibold">{dict["about"]["team"]["jerry"]["name"]}</h3>
                        <p className="text-gray-400">{dict["about"]["team"]["jerry"]["role"]}</p>
                        <p className="text-gray-500 mt-2">{dict["about"]["team"]["jerry"]["fact"]}</p>
                    </div>

                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-red-700"></div>
                        <h3 className="text-xl font-semibold">{dict["about"]["team"]["miki"]["name"]}</h3>
                        <p className="text-gray-400">{dict["about"]["team"]["miki"]["role"]}</p>
                        <p className="text-gray-500 mt-2">{dict["about"]["team"]["miki"]["fact"]}</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 bg-gradient-to-bl  from-gray-900 to-gray-800 text-center rounded-t-3xl overflow-hidden" >
                <h2 className="text-3xl font-bold mb-8">{dict["about"]["how-it-works"]["title"]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <div className="text-4xl mb-4">📊</div>
                        <p className="text-lg text-gray-400">{dict["about"]["how-it-works"]["step1"]}</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg text-gray-400">{dict["about"]["how-it-works"]["step2"]}</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">💡</div>
                        <p className="text-lg text-gray-400">{dict["about"]["how-it-works"]["step3"]}</p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 px-4 bg-gradient-to-tr from-gray-900 to-gray-800 text-center">
                <h2 className="text-3xl font-bold mb-8">{dict["about"]["values"]["title"]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-200">{dict["about"]["values"]["value1"]}</h3>
                        <p className="text-gray-400">{dict["about"]["values"]["value1-desc"]}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-200">{dict["about"]["values"]["value2"]}</h3>
                        <p className="text-gray-400">{dict["about"]["values"]["value2-desc"]}.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-200">{dict["about"]["values"]["value3"]}</h3>
                        <p className="text-gray-400">{dict["about"]["values"]["value3-desc"]}</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 bg-gray-900 text-center">
                <h2 className="text-3xl font-bold mb-8">{dict["about"]["testimonial"]["title"]}</h2>
                <div className="space-y-8">
                    <blockquote className="text-lg italic text-gray-300 border-l-4 pl-4 border-gray-500">{dict["about"]["testimonial"]["testimonial1"]}</blockquote>
                    <blockquote className="text-lg italic text-gray-300 border-l-4 pl-4 border-gray-500">{dict["about"]["testimonial"]["testimonial2"]}</blockquote>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="py-20 px-4 text-center rounded-b-3xl bg-yellow-300">
                <h2 className="text-3xl font-bold mb-4 text-black">{dict["about"]["cta"]["headline"]}</h2>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-black text-white text-lg font-semibold border-2 border-black hover:border-white hover:bg-white hover:text-black transition hover:rounded-full"
                >
                    {dict["about"]["cta"]["btn"]}
                </a>
            </section>
        </div>
    );
};
