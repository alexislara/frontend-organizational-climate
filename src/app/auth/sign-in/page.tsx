"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Page = () => {
    return (
        <section className="grid grid-cols-2 h-screen w-full overflow-hidden">
            <div className="relative h-full w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                >
                    <div className="absolute inset-0 bg-[#000075] backdrop-blur-md flex flex-col justify-between px-6 lg:px-20 py-10 lg:py-20">
                        <div>
                            <div className="mb-6 lg:mb-10">
                                <div className="bg-white p-2 w-14 h-14 lg:w-16 lg:h-16 rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center">
                                    <Image
                                        src="/img/lth-logo.png"
                                        height={50}
                                        width={50}
                                        alt="LTH Logo"
                                    />
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-white drop-shadow-xl">
                                Encuestas de Clima Organizacional
                            </h1>
                            <p className="mt-4 lg:mt-6 text-base lg:text-xl text-gray-200 max-w-2xl leading-relaxed">
                                Un espacio para evaluar el <span className="font-semibold text-white">clima laboral</span> en LTH Clarios, fomentar la <span className="font-semibold text-white">comunicación interna</span> y mejorar el ambiente de trabajo.
                            </p>
                        </div>
                        <footer className="text-center text-xs lg:text-sm text-white/80">
                            <p>&copy; {new Date().getFullYear()} SYSE-I. Todos los derechos reservados.</p>
                        </footer>
                    </div>
                </div>
            </div>
            <div className="flex-1 transition-[width] duration-200 ease-linear flex justify-center items-center p-6 lg:p-8 bg-white dark:bg-neutral-900">
                <div className="w-full max-w-md space-y-6 lg:space-y-8 transition-all duration-200">
                    <div className="text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white transition-all duration-200">
                            Inicia sesión
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-all duration-200">
                            Accede a las encuestas de clima organizacional.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            variant="default"
                            className="w-full py-3 text-sm lg:text-md"
                            onClick={() => signIn("django", { callbackUrl: "/" })}
                        >
                            Entrar con cuenta institucional
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;