import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Alert from '@/Components/Alert';
export default function Index({ auth, cartItems, success, warning, info }) {
    const [confirmingDeleteItem, setItem] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [total, setTotal] = useState(0);
    const closeModal = () => {
        setItem(false);
    };
    const calculateTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += (item.quantity * item.product.price);
        });
        setTotal(totalPrice);
    };
    useEffect(() => {
        calculateTotal();
    }, [cartItems]);
    const deleteItem = (itemId) => {
        setDeleteItemId(itemId);
        setItem(true);
    };
    const handleDeleteItem = () => {
        axios.delete(`/cart_item/${deleteItemId}`)
        window.location.reload();
    };
    return (
        <AuthenticatedLayout
            user={auth.user}>

            <Head title="Mi Carrito" />

            {success && (
                <Alert type="success" className="my-3 mx-10">
                    {success}
                </Alert>
            )}
            
            {warning && (<div id="alert-border-4" className="flex items-center mx-16 p-4 mt-16 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div className="ms-3 text-sm font-medium">
                {warning}
                </div>
            </div>)}

            {info && (<div id="alert-border-4" className="flex items-center mx-16 p-4 mt-16 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div className="ms-3 text-sm font-medium">
                {info}
                </div>
            </div>)}
            <section class="py-8 relative">
                <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                        Carrito de Compras
                    </h2>
                    {cartItems.length > 0 ? (
                        <>
                        <div class="hidden lg:grid grid-cols-2 py-6">
                            <div class="font-normal text-xl leading-8 text-gray-500">Producto</div>
                                <p class="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                                    <span class="w-full max-w-[200px] text-center">Cantidad</span>
                                    <span class="w-full max-w-[200px] text-center">Precio Unitario</span>
                                    <span class="w-full max-w-[200px] text-center">Total</span>
                                    <span class="w-full max-w-[200px] text-center">Opciones</span>
                                </p>
                            </div>
                            {cartItems.map((item) => ( 
                                <div key={item.id} class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                                    <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                        <div class="img-box">
                                        {item.product.colors.map(color => (
                                            color.id === item.color_id && (
                                                <img key={color.id} src={'/storage/' + color.images[0].image} alt={color.name} className="xl:w-[140px]" />
                                            )
                                        ))}
                                        </div>
                                        <div class="pro-data w-full max-w-sm ">
                                            <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                                                {item.product.name}
                                            </h5>
                                            <p class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
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
                                        <h6 class="font-manrope font-bold text-xl leading-9 text-black w-full ms-2 max-w-[176px] text-center">
                                            Bs. {item.product.price}
                                            <span class="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                                                (Precio)
                                            </span>
                                        </h6>
                                        <h6 class="text-indigo-600 font-manrope font-bold text-xl leading-9 ms-3 w-full max-w-[176px] text-center">
                                            Bs. {(item.quantity * item.product.price)}
                                        </h6>
                                        <div class="flex items-center w-full mx-auto justify-center me-16">
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            type="button" 
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded ms-10"
                                        >
                                            Quitar
                                        </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                                <div class="flex items-center justify-between w-full mb-6">
                                    <p class="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                                    <h6 class="font-semibold text-xl leading-8 text-gray-900"></h6>
                                </div>
                                <div class="flex items-center justify-between w-full py-6">
                                    <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                                    <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                                    Bs. {total.toFixed(2)}
                                    </h6>
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
                        </>
                    ) : (
                        <div className="text-center mt-8">
                            <p className="text-gray-600">Tu carrito está vacío.</p>
                            <Link href={route('product.catalog')}>
                                <a className="text-indigo-600 hover:text-indigo-800">Ir a la tienda</a>
                            </Link>
                        </div>
                    )}
                </div>

                <Modal show={confirmingDeleteItem} onClose={closeModal}>
                    <div className="relative p-4 w-full max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    ¡Confirmación necesaria!
                                </h3>
                            </div>
                            <div className="p-4 md:p-5">
                                <p className="text-gray-700 dark:text-gray-300">
                                    ¿Estás seguro/a de que quieres quitar este producto del carrito?
                                </p>
                            </div>
                            <div className="flex justify-end px-4 py-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 rounded-b">
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 dark:text-gray-400 bg-transparent font-semibold py-2 px-4 border border-gray-400 rounded mr-2 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteItem}
                                    className="text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 border border-red-600 rounded transition-all duration-300"
                                >
                                    Quitar Producto
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

            </section>
        </AuthenticatedLayout>
    );
}