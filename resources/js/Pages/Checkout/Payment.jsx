import React from 'react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Checkout({ auth, cartItems, shippings, subTotalAmount }) {
    const [approvalUrl, setApprovalUrl] = useState('');
    const [selectedShipping, setSelectedShipping] = useState(shippings[0]);
    const totalAmount = subTotalAmount + (selectedShipping ? selectedShipping.price : 0);

    const handlePayPalPayment = async () => {
        try {
            const response = await axios.post('/paypal/process', {
                totalAmount,
                shippingId: selectedShipping.id,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response from server:', response.data);
            setApprovalUrl(response.data.approvalUrl);
            window.history.replaceState(null, null, window.location.pathname);
        } catch (error) {
            console.error('Payment error:', error);
        }
    };


    useEffect(() => {
        if (approvalUrl) {
            window.location.href = approvalUrl;
        }
    }, [approvalUrl]);

    const handleShippingChange = (shipping) => {
        setSelectedShipping(shipping);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
        <Head title="Detalles de Pago" />

        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-34 xl:px-18">
            <div class="px-4 pb-28 pt-16">
                <p class="text-xl font-medium text-gray-900 dark:text-white">Resumen de Pedido</p>
                <p class="text-gray-400">Revisa tus artículos. Y seleccione un método de envío adecuado.</p>
                <div class="mt-8 space-y-3 rounded-lg bg-white dark:bg-gray-800 px-2 sm:px-6">
                <div id="product-container" className="mt-8 space-y-3 rounded-lg bg-white dark:bg-gray-800 px-2 sm:px-6">
                {cartItems.map((item) => (
                    <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800 sm:flex-row" key={item.id}>
                        {item.product.images.length > 0 && (
                            item.product.images
                                .filter(image => image.color_id === item.color_id)
                                .map((filteredImage, index) => (
                                    <img 
                                        key={index} 
                                        className="rounded-md border object-cover object-center" 
                                        src={'/storage/' + filteredImage.image} 
                                        alt={item.product.name} 
                                        width={200}
                                    />
                                ))
                        )}
                        <div className="flex w-full flex-col px-4 py-4">
                            <span className="font-semibold text-gray-900 dark:text-white">{item.product.name}</span>
                            <span className="float-right text-gray-400">Talla: {item.size.name}</span>
                            <span className="float-right text-gray-400">Color: {item.color.name}</span>
                            <p className="text-lg font-bold text-gray-400">Bs. {item.product.price.toFixed(2)}</p>
                            {item.design && (
                                <div className="mt-2">
                                    <p className="text-gray-900 dark:text-white">Diseño: {item.design.name}</p>
                                    <p className="text-gray-400">Precio del diseño: Bs. {item.design.price.toFixed(2)}</p>
                                </div>
                            )}
                            <span className="float-right text-gray-400 text-xl">Cantidad: {item.quantity}</span>
                        </div>
                    </div>
                ))}
                </div>

                </div>

                <p class="mt-8 text-lg font-medium text-gray-900 dark:text-white">Métodos de Envío</p>
                {shippings && shippings.length > 0 && shippings.map((shipping, index) => (
                    <div className="relative mt-5" key={shipping.id}>
                        <input 
                            onChange={() => handleShippingChange(shipping)}
                            className="peer hidden" id={`radio_${index}`} type="radio" name="radio" defaultChecked={index === 0} />
                        <span className="peer-checked:border-indigo-500 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-indigo-800"></span>
                        <label className="peer-checked:border-2 peer-checked:border-indigo-500 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor={`radio_${index}`}>
                            <div className="ml-5">
                                <span className="mt-2 font-semibold text-gray-800 dark:text-white">{shipping.name}</span>
                                <p className="text-slate-500 text-sm leading-6">{shipping.description}</p>
                                <p className="text-slate-500 text-sm leading-6">Precio: Bs. {shipping.price.toFixed(2)}</p>
                            </div>
                        </label>
                    </div>
                ))}
        </div>
        <div class="px-4 py-4">
            <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Subtotal</p>
                <p class="font-semibold text-gray-900 dark:text-white">Bs. {subTotalAmount.toFixed(2)}</p>
                </div>
                <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Envío</p>
                {selectedShipping && (
                    <p className="font-semibold text-gray-900 dark:text-white">Bs. {selectedShipping.price.toFixed(2)}</p>
                )}
                </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Total</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">Bs. {totalAmount.toFixed(2)}</p>
            </div>
            <PrimaryButton
                onClick={handlePayPalPayment}
                className="mt-4 w-full flex items-center justify-center"
            >
                <i className="fab fa-paypal mr-5"></i>
                Pagar con PayPal
            </PrimaryButton>

        </div>
    </div>
    
    </AuthenticatedLayout>
);
}
