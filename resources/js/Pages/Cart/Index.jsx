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
            const itemTotalPrice = item.quantity * (item.product.price + (item.design ? item.design.price : 0));
            totalPrice += itemTotalPrice;
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

            <Head title="Carrito de Compras" />
            
            <section className="text-gray-600 body-font">
                <div className="container px-16 py-10 mx-auto pb-96">

                    {success && (
                        <Alert type="success" className="mx-10">
                            {success}
                        </Alert>
                    )}
                    
                    {warning && (<div id="alert-border-4" className="flex p-4 items-center text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                        {warning}
                        </div>
                    </div>)}

                    {info && (<div id="alert-border-4" className="flex items-center p-4 mt-16 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                        {info}
                        </div>
                    </div>)}

                    <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center dark:text-white my-14">
                        Carrito de Compras
                    </h2>
                        {cartItems.length > 0 ? (
                        <>
                            <div className="hidden lg:grid grid-cols-2">
                                <div className="font-normal text-xl leading-8 text-gray-500 text-center dark:text-white">Producto</div>
                                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                                    <span className="w-full max-w-[200px] text-center dark:text-white">Cantidad</span>
                                    <span className="w-full max-w-[200px] text-center dark:text-white">Precio Unitario</span>
                                    <span className="w-full max-w-[200px] text-center dark:text-white">Total</span>
                                    <span className="w-full max-w-[200px] text-center dark:text-white">Opciones</span>
                                </p>
                            </div>
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                                    <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                        <div className="img-box">
                                        {item.product.images.length > 0 && (
                                            item.product.images
                                                .filter(image => image.color_id === item.color_id)
                                                .map((filteredImage, index) => (
                                                    <img 
                                                        key={index} 
                                                        src={'/storage/' + filteredImage.image} 
                                                        alt={item.product.name} 
                                                        className="xl:w-[140px]" 
                                                    />
                                                ))
                                        )}
                                        </div>
                                        <div className="pro-data w-full max-w-sm">
                                            <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center dark:text-white">
                                                {item.product.name}
                                            </h5>
                                            {item.design && (
                                                <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center dark:text-white">
                                                    Diseño: {item.design.name}
                                                </p>
                                            )}
                                            <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center dark:text-white">
                                                Bs. {item.product.price}
                                                {item.design && (
                                                    <span> + Diseño Bs. {item.design.price}</span>
                                                )}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-col min-[550px]:flex-row w-full ms-8 max-xl:max-w-xl max-xl:mx-auto gap-2">
                                        <h6 className="font-manrope font-bold text-xl leading-9 text-black w-full max-w-[176px] text-center">
                                            <span className="dark:text-white">{item.quantity}</span>
                                            <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap dark:text-white">
                                                (Cantidad)
                                            </span>
                                        </h6>
                                        <h6 className="font-manrope font-bold text-xl leading-9 text-black w-full ms-2 max-w-[176px] text-center">
                                            <span className="dark:text-white"> Bs. {item.product.price + (item.design ? item.design.price : 0)}</span>
                                            <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap dark:text-white">
                                                (Precio)
                                            </span>
                                        </h6>
                                        <h6 className="text-indigo-600 font-manrope font-bold text-xl leading-9 ms-3 w-full max-w-[176px] text-center">
                                            Bs. {item.quantity * (item.product.price + (item.design ? item.design.price : 0))}
                                        </h6>
                                        <div className="flex items-center w-full mx-auto justify-center me-16">
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
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                                {/*<div className="flex items-center justify-between w-full mb-6">
                                    <p className="font-normal text-xl leading-8 text-gray-400 text-center dark:text-white">Sub Total</p>
                                    <h6 className="font-semibold text-xl leading-8 text-gray-900"></h6>
                                </div>*/}
                                <div className="flex items-center justify-between w-full py-6">
                                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900 text-center dark:text-white">Total</p>
                                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                                        Bs. {total.toFixed(2)}
                                    </h6>
                                </div>
                            </div>
                            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                                <Link href={route("product.catalog")} className="rounded-full py-4 w-full max-w-[280px] flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100 font-semibold text-lg text-indigo-600">
                                    Continuar Comprando
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <Link href={route("checkout.payment")} className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
                                    Continuar con el pago
                                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center mt-8">
                            <p className="text-gray-600 dark:text-white">Tu carrito está vacío.</p>
                            <Link href={route('product.catalog')}>
                                <a className="text-indigo-600 hover:text-indigo-800">Ir a la tienda</a>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

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
        </AuthenticatedLayout>
    );
}