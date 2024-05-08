import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function Index({ auth, cartItems, success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}>

            <Head title="Mi Carrito" />

            {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded-lg my-10 mx-10">
                {success}
            </div>)}

            <section class="py-8 relative">
                <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                        Carrito de Compras
                    </h2>
                    
                    <div class="hidden lg:grid grid-cols-2 py-6">
                        <div class="font-normal text-xl leading-8 text-gray-500">Producto</div>
                        <p class="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                            <span class="w-full max-w-[200px] text-center">Cantidad</span>
                            <span class="w-full max-w-[200px] text-center">Precio Unitario</span>
                            <span class="w-full max-w-[200px] text-center">Total</span>
                        </p>
                    </div>

                    {cartItems.map((item) => ( 
                        <div key={item.id} class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                            <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                    <div class="img-box">
                                        <img src={'/storage/'+item.product.colors[0].images[0].image} alt="perfume bottle image" class="xl:w-[140px]"></img>
                                    </div>
                                <div class="pro-data w-full max-w-sm ">
                                    <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                                        {item.product.name}
                                    </h5>
                                    <p class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                        Perfumes
                                    </p>
                                    <h6 class="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                                        Bs. {item.product.price}
                                    </h6>
                                </div>
                            </div>
                            <div class="flex items-center flex-col min-[550px]:flex-row w-full ms-8 max-xl:max-w-xl max-xl:mx-auto gap-2">
                                <h6 class="font-manrope font-bold text-xl leading-9 text-black w-full max-w-[176px] text-center">
                                    {item.quantity}
                                    <span class="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                                        (Cantidad)
                                    </span>
                                </h6>
                                <h6 class="font-manrope font-bold text-xl leading-9 text-black w-full ms-16 max-w-[176px] text-center">
                                    Bs. {item.product.price}
                                    <span class="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                                        (Precio)
                                    </span>
                                </h6>
                                <div class="flex items-center w-full mx-auto justify-center">
                                </div>
                                <h6 class="text-indigo-600 font-manrope font-bold text-xl leading-9 me-16 w-full max-w-[176px] text-center">
                                    Bs. {(item.quantity * item.product.price).toFixed(2)}
                                </h6>
                            </div>
                        </div>
                    ))}
                    
                    <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                        <div class="flex items-center justify-between w-full mb-6">
                            <p class="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                            <h6 class="font-semibold text-xl leading-8 text-gray-900">$360.00</h6>
                        </div>
                        <div class="flex items-center justify-between w-full py-6">
                            <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                            <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">$405.00</h6>
                        </div>
                    </div>


                    <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                        <button class="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                            <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Continuar Comprando</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"> <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
                            Continuar con el pago
                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}