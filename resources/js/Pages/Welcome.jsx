import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Welcome({ auth, success }) {
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    return (
        <AuthenticatedLayout user={auth.user}>
        <Head title="Inicio" />

        {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded-lg my-10 mx-10">
            {success}
        </div>)}
        
        <section className="relative bg-cover bg-center text-white" style={{ backgroundImage: "url('https://image.spreadshirtmedia.net/content/f_auto/x_650,y_22,w_1715,h_536,c_crop/w_1920/v1/cms/ml/teaser/Teaser_after_winter_Shirt_ES')" }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1
                }}></div>
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center relative" style={{ zIndex: 2 }}>
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="lg:text-8xl font-bold leading-tight text-3xl text-yellow-400">¡Bienvenido a {appName}!</h1><br />
                    <p className="mb-8 leading-relaxed">
                        <h1 className="lg:text-5xl font-bold leading-tight text-3xl text-yellow-400">
                        Crea tus propios artículos personalizados.
                        </h1>
                        <br />
                        <h1 className="lg:text-3xl font-bold leading-tight text-3xl text-yellow-400">
                        ¡Elige entre una gran variedad de objetos personalizables y diséñalos tú mismo!
                        </h1>
                    </p>
                    <div className="flex justify-center">
                        <Link
                        href={route('register')}
                        className="inline-flex items-center justify-center bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg text-white">
                        Empieza Ahora
                        </Link>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                        Diseña Ahora
                        </button>
                    </div>
                    </div>
                </div>
            </section>


        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap flex-col text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-center">Como personalizar los productos</h1>
                <div class="flex flex-wrap w-full">
                <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                    <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                            <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                            <svg class="w-6 h-6 text-gray-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                            </svg>
                        </div>
                        <div class="flex-grow pl-4">
                            <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PASO 1</h2>
                            <p class="leading-relaxed">Selecciona un producto de tu agrado en el catálogo de productos.</p>
                        </div>
                    </div>
                    <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                            <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div class="flex-grow pl-4">
                            <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PASO 2</h2>
                            <p class="leading-relaxed">Elige tus colores preferidos y también la talla.</p>
                        </div>
                    </div>
                    <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                            <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                            <svg class="w-6 h-6 text-gray-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
                            </svg>
                        </div>
                        <div class="flex-grow pl-4">
                            <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PASO 3 (opcional)</h2>
                            <p class="leading-relaxed">Puedes elegir un diseño, ya sea uno existente o crear y subir tu propio diseño.</p>
                        </div>
                    </div>
                    <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                            <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div class="flex-grow pl-4">
                            <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PASO 4</h2>
                            <p class="leading-relaxed">Añade cuantos productos quieras a tu carrito de compras.</p>
                        </div>
                    </div>
                    <div class="flex relative">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                        </div>
                        <div class="flex-grow pl-4">
                            <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINALMENTE</h2>
                            <p class="leading-relaxed">Añade tu carrito de compras y selecciona métodos de pago y de envío para adquirir tu producto.</p>
                        </div>
                    </div>
                </div>
                    <img src="https://image.spreadshirtmedia.net/content/f_auto,q_80/v2/CMS/Startpage/Hero/Spring2024/Spring-HPTeaser-EU-ES-desktop" alt="step" class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"/>
                </div>
            </div>
        </section>

        <section class="text-gray-600 body-font">
            <div class="container px-5 mx-auto">
                <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">GJTEXTILES
                </h1>
                <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div class="p-4 md:w-1/3 flex">
                        <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white mb-4 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-6">
                                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Materiales de Alta Calidad</h2>
                                <p class="leading-relaxed text-base">Descubre nuestra colección de textiles elaborados con los mejores materiales del mercado, garantizando durabilidad y comodidad en cada prenda.</p>
                                <a class="mt-3 text-yellow-500 inline-flex items-center">Aprende Más
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                                </a>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex">
                            <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white mb-4 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-6 h-6" viewBox="0 0 24 24">
                                <circle cx="6" cy="6" r="3"></circle>
                                <circle cx="6" cy="18" r="3"></circle>
                                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-6">
                            <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Diseños Innovadores</h2>
                            <p class="leading-relaxed text-base">Nuestros diseños combinan lo último en tendencias con la comodidad y funcionalidad, asegurando que siempre estés a la moda.</p>
                            <a class="mt-3 text-yellow-500 inline-flex items-center">Descubre Más
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                            </a>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 flex">
                            <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white mb-4 flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="flex-grow pl-6">
                                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Personalización Única</h2>
                                <p class="leading-relaxed text-base">Personaliza tus prendas con nuestros servicios de bordado y estampado, creando artículos únicos que reflejan tu estilo personal.</p>
                                <a class="mt-3 text-yellow-500 inline-flex items-center">Ver Opciones
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <footer class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
                <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <span class="text-xl">GJTextiles</span>
                </a>
                <p class="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
                </div>
                <div class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                    <nav class="list-none mb-10">
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">First Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                    </li>
                    </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                    <nav class="list-none mb-10">
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">First Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                    </li>
                    </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                    <nav class="list-none mb-10">
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">First Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                    </li>
                    </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                    <nav class="list-none mb-10">
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">First Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                    </li>
                    <li>
                        <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                    </li>
                    </nav>
                </div>
                </div>
            </div>
            <div class="bg-gray-900">
                <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                <p class="text-yellow-500 text-md text-center sm:text-left">© 2024 {appName}</p>
                <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <a class="text-yellow-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                    </a>
                    <a class="ml-3 text-yellow-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                    </a>
                    <a class="ml-3 text-yellow-500">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                    </a>
                    <a class="ml-3 text-yellow-500">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" class="w-5 h-5" viewBox="0 0 24 24">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                    </a>
                </span>
                </div>
            </div>
        </footer>
        </AuthenticatedLayout>
    );
}