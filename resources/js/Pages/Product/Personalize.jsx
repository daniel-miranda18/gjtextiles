import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';

export default function Personalize({ auth, user, product, sizes, colors }) {
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [selectedColor, setSelectedColor] = useState(null);
    const {data, setData, post} = useForm({
        product_id: product.id,
        color_id: "",
        size_id: "",
        quantity: 1,
        selectedSizes: [],
        selectedColors: [],
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("cart.store"));
    }

    const handleSelectionChange = (type, value) => {
        setData(prevFormData => ({
            ...prevFormData,
            [type + "_id"]: value,
        }));
        if (type === "color") {
            setSelectedColor(value);
            const selectedColorObj = colors.find((color) => color.id === value);
            if (selectedColorObj && selectedColorObj.images.length > 0) {
                setSelectedImage(selectedColorObj.images[0].image);
            } else {
                setSelectedImage(null);
            }
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setData(prevFormData => ({
            ...prevFormData,
            quantity: value,
        }));
    };

    const decreaseQuantity = () => {
        if (data.quantity > 1) {
            setData({
                ...data,
                quantity: data.quantity - 1,
            });
        }
    };

    const increaseQuantity = () => {
        setData({
            ...data,
            quantity: data.quantity + 1,
        });
    };

    useEffect(() => {
        if (selectedColor === null) {
            const firstColor = colors[0];
            if (firstColor && firstColor.images.length > 0) {
                setSelectedImage(firstColor.images[0].image);
            }
        }
    }, [selectedColor, selectedImage]);
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Personalizar" />
            <section className="relative mt-16">
                <div className="w-full px-4 sm:px-6 sm:px-0 my-6">
                    <div className="grid sm:grid-cols-2">
                        <div className="img flex items-left w-96 mx-auto mb-5">
                            <div className="img-box bg-white-200 hover:bg-gray-100 w-96 h-96 mx-auto my-auto rounded-lg shadow-lg overflow-hidden">
                                {selectedImage !== null ? (
                                    <img src={'/storage/' + selectedImage} alt={selectedImage} className="object-cover my-auto mx-auto h-full" />
                                ) : (
                                    <div className="bg-red-500 py-2 px-4 text-white text-center rounded-lg mt-16">
                                        <p>NO DISPONIBLE EN ESTE MOMENTO.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="data w-full xl:justify-start justify-center flex items-center xl:my-2 lg:my-2">
                            <div className="data w-full max-w-xl">
                                <h2 className="font-bold text-xl text-gray-900 mb-2 uppercase">
                                    {product.name}
                                </h2>
                                <form onSubmit={onSubmit}>
                                    <input
                                        type="hidden"
                                        name="product_id"
                                        value={product.id}
                                    />
                                    <input
                                        type="hidden"
                                        name="size_id"
                                        value={data.size_id || ''}
                                        onChange={(e) => setData("product_id", e.target.value)}
                                    />
                                    <input
                                        type="hidden"
                                        name="color_id"
                                        value={data.color_id || ''}
                                        onChange={(e) => setData("product_id", e.target.value)}
                                    />
                                    <p className="text-gray-900 text-md font-medium"><b>Talla</b></p>
                                    <div className="w-100 pb-2 border-b border-gray-100 flex-wrap">
                                        <div className="grid grid-cols-3 min-[300px]:grid-cols-5 gap-3">
                                            {sizes.map(size => (
                                                <label key={size.id} className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="size"
                                                        value={size.id}
                                                        className="sr-only"
                                                        onChange={() => handleSelectionChange("size", size.id)}
                                                    />
                                                    <span className={`bg-indigo text-center py-1.5 px-6 w-full font-semibold text-sm leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 visited:border-gray-300 visited:bg-gray-50 ${data.size_id === size.id ? "bg-indigo-600 text-white" : ""}`}>{size.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-900 text-md font-medium"><b>Color</b></p>
                                    <div className="w-100 pb-2 border-b border-gray-100 flex-wrap">
                                        <div className="grid grid-cols-4 gap-3">
                                            {colors.map(color => (
                                                <label key={color.id} className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="color"
                                                        value={color.id}
                                                        className="sr-only"
                                                        onChange={() => handleSelectionChange("color", color.id)}
                                                    />
                                                    <span className={`bg-${color.name.toLowerCase()} text-center py-1.5 px-6 w-full font-semibold text-sm leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 visited:border-gray-300 visited:bg-gray-50 ${data.color_id === color.id ? "bg-indigo-600 text-white" : ""}`}>{color.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="my-4">
                                        <p className="text-gray-900 text-md font-medium"><b>Detalles</b></p>
                                        <div className="w-full pb-2 border-b border-gray-100 flex-wrap">
                                            <h6>Precio Unitario: Bs. {product.price}</h6>
                                            <h6>Precio Total: <b>Bs. {product.price * data.quantity}</b></h6>
                                        </div>
                                    </div>

                                    <p className="text-gray-900 text-md font-medium"><b>Cantidad</b></p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                                        <div className="flex sm:items-center sm:justify-center w-full">
                                            <button type="button" onClick={decreaseQuantity} className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                                <svg className="stroke-gray-900 group-hover:stroke-black" width="16" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                    <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                    <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                value={data.quantity}
                                                readOnly
                                                onChange={handleQuantityChange}
                                                className="font-semibold text-gray-900 cursor-pointer text-lg py-[7px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                                            />
                                            <button type="button" onClick={increaseQuantity} className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                                <svg className="stroke-gray-900 group-hover:stroke-black" width="16" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="sm:grid-cols-2 gap-3 my-2">
                                            <button 
                                            type="submit" 
                                            className="group py-2 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                                            disabled={!data.color_id || !data.size_id}
                                            >
                                                <svg className="stroke-indigo-600 " width="22" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                                        stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                </svg>
                                                Añadir a Carrito
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <button className="text-center w-full px-5 py-3 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                            Comprar Ahora
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
