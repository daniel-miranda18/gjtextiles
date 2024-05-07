import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';

export default function Personalize({ auth, user, product, sizes, colors }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [addToCartDisabled, setAddToCartDisabled] = useState(true);

    const getSelectedClass = (type, value) => {
        if (type === "size") {
            return selectedSize === value ? "bg-indigo-600 text-white" : "";
        } else if (type === "color") {
            return selectedColor === value ? "bg-indigo-600 text-white" : "";
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleSelectionChange = (type, value) => {
        if (type === "color") {
            setSelectedColor(value);
            const selectedColorObj = colors.find(color => color.id === value);
            if (selectedColorObj && selectedColorObj.images.length > 0) {
                setSelectedImage(selectedColorObj.images[0].image);
            } else {
                setSelectedImage(null);
            }
        }
    };

    useEffect(() => {
        if (selectedColor === null) {
            const firstColor = colors[0];
            if (firstColor && firstColor.images.length > 0) {
                setSelectedImage(firstColor.images[0].image);
            }
        }
        if (selectedSize !== null && selectedColor !== null && selectedImage !== null) {
            setAddToCartDisabled(false);
        } else {
            setAddToCartDisabled(true);
        }
    }, [selectedSize, selectedColor, selectedImage]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Personalizar" />
            <section className="relative">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 my-6">
                    <div className="grid md:grid-cols-2">
                        <div className="img flex items-left w-96 mx-auto mb-5">
                            <div className="img-box bg-white-200 hover:bg-gray-100 w-96 h-96 mx-auto my-auto rounded-lg shadow-lg overflow-hidden">
                                    {selectedImage !== null ? (
                                        <img src={'/storage/'+ selectedImage} alt={selectedImage} className="object-cover my-auto mx-auto h-full" />
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
                                <p className="text-gray-900 text-md font-medium">Talla</p>
                                <div className="w-100 pb-2 border-b border-gray-100 flex-wrap">
                                    <div className="grid grid-cols-3 min-[300px]:grid-cols-5 gap-3">
                                        {sizes.map(size => (
                                            <label key={size.id} className="inline-flex items-center">
                                                <input type="radio" name="size" value={size.id} className="sr-only" onChange={() => setSelectedSize(size.id)} checked={selectedSize === size.id} />
                                                <span className={`bg-indigo text-center py-1.5 px-6 w-full font-semibold text-sm leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 visited:border-gray-300 visited:bg-gray-50 ${getSelectedClass("size", size.id)}`}>{size.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-900 text-md font-medium">Color</p>
                                <div className="w-100 pb-2 border-b border-gray-100 flex-wrap">
                                    <div className="grid grid-cols-4 gap-3">
                                        {colors.map(color => (
                                            <label key={color.id} className="inline-flex items-center">
                                                <input type="radio" name="color" value={color.id} className="sr-only" onChange={() => handleSelectionChange("color", color.id)} checked={selectedColor === color.id} />
                                                <span className={`bg-${color.name.toLowerCase()} text-center py-1.5 px-6 w-full font-semibold text-sm leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 visited:border-gray-300 visited:bg-gray-50 ${getSelectedClass("color", color.id)}`}>{color.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-900 text-md font-medium">Detalles</p>
                                <div className="w-full pb-2 border-b border-gray-100 flex-wrap">
                                    <h6 className="font-manrope font-semibold text-sm text-gray-900">
                                        Precio Unitario: Bs. {product.price}
                                    </h6>
                                    <h6 className="font-manrope leading-8 font-semibold text-sm text-gray-900 pr-5 mr-5">
                                        Precio Total: Bs. {product.price * quantity}
                                    </h6>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                                    <div className="flex sm:items-center sm:justify-center w-full">
                                        <button onClick={decreaseQuantity} className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <svg className="stroke-gray-900 group-hover:stroke-black" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <input type="text" value={quantity} readOnly className="font-semibold text-gray-900 cursor-pointer text-lg py-[10px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50" />
                                        <button onClick={increaseQuantity} className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <svg className="stroke-gray-900 group-hover:stroke-black" width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button 
                                     className="group py-2 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                                     disabled={addToCartDisabled}>
                                        <svg className="stroke-indigo-600 " width="22" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                                stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        Añadir a Carrito
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="text-center w-full px-5 py-3 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                        Comprar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
