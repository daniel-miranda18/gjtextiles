import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function Personalize({ auth, user, product, sizes, colors, design }) {
    const [showButtons, setshowButtons] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [confirmingDesign, setDesign] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [selectedColor, setSelectedColor] = useState(null);
    const [newDesignImage, setNewDesignImage] = useState(null);
    const [responsePrice, setResponsePrice] = useState(null);
    const [selectedDesignId, setSelectedDesignId] = useState(null);

    const {data, setData, post} = useForm({
        product_id: product.id,
        color_id: "",
        size_id: "",
        design_id: "",
        quantity: 1,
        selectedSizes: [],
        selectedColors: [],
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("cart.store"));
    }

    const addOption = () => {
        setshowButtons(true);
    }

    const addDesign = () => {
        setDesign(true);
    };

    const closeModal = () => {
        setDesign(false);
        setShowFileInput(false);
    };
    
    const toggleFileInput = () => {
        setShowFileInput(!showFileInput);
    };

    useEffect(() => {
        if (design && design.id) {
            setData(prevState => ({
                ...prevState,
                design_id: design.id
            }));
        }
    }, [design]);

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
            if (value !== "" && data.size_id !== "") {
                setData(prevFormData => ({
                    ...prevFormData,
                    showLink: true,
                }));
            } else {
                setData(prevFormData => ({
                    ...prevFormData,
                    showLink: false,
                }));
            }
            if (selectedDesignId !== null) {
                if(design){
                    setSelectedDesignId(design.id);
                }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageInput = document.getElementById('image');
            const selectedTechnique = document.getElementById('technique');
            const image = imageInput.files[0];
            const technique = selectedTechnique.value;
            const price = document.getElementById('price').value;

            const formData = new FormData();

            formData.append('name', 'Diseño');
            formData.append('price', price);
            formData.append('image', image);
            formData.append('technique', technique);
    
            const response = await axios.post(route("design.store"), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSelectedDesignId(response.data.id);
            setData(prevFormData => ({
                ...prevFormData,
                design_id: response.data.id,
            }));
            setResponsePrice(response.data.price);
            setNewDesignImage(response.data.image);
            
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Personalizar" />
            <section className="relative mt-16">
                <div className="w-full px-4 sm:px-6 my-6">
                    <div className="grid sm:grid-cols-2">
                        <div className="img flex items-left w-96 mx-auto mb-5">
                            <div className="img-box bg-white-200 hover:bg-gray-100 w-96 h-96 mx-auto my-auto rounded-lg shadow-lg overflow-hidden relative">
                                {selectedImage !== null ? (
                                    <>
                                        <img src={'/storage/' + selectedImage} alt={selectedImage} className="object-cover my-auto mx-auto h-full" />
                                    </>
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
                                    <input
                                        type="hidden"
                                        name="design_id"
                                        value={design ? design.id : ''}
                                        onChange={(e) => setData("design_id", e.target.value)}
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">

                                    {newDesignImage || design ? (
                                        <>
                                            <p className="text-gray-900 text-md font-medium"><b>Diseño</b></p>
                                            &nbsp;
                                            <div className="w-100 pb-2 border-b border-gray-100 flex-wrap">
                                                {newDesignImage && (
                                                    <img src={'/storage/' + newDesignImage} alt="Nuevo diseño" width={60} />
                                                )}
                                                {design && (
                                                    <img src={'/storage/' + design.image} alt="Diseño existente" width={60} />
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        {showButtons ? (
                                            <>
                                                <div className="flex sm:items-center sm:justify-center w-full">
                                                    <button
                                                        onClick={addDesign}
                                                        type="button"
                                                        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 me-2"
                                                    >
                                                        NUEVO DISEÑO
                                                    </button>
                                                </div>
                                                <div className="flex sm:items-center sm:justify-center w-full">
                                                    <Link
                                                        href={route("design.list", { id: product.id })}
                                                        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 me-2 text-center"
                                                    >
                                                        VER DISEÑOS
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex sm:items-center sm:justify-center w-full">
                                                <button
                                                    onClick={addOption}
                                                    type="button"
                                                    className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 me-2"
                                                >
                                                    AÑADIR DISEÑO
                                                </button>
                                                (Opcional)
                                            </div>
                                        )}
                                        </>
                                    )}

                                    </div>
                                    <div className="my-4">
                                        <p className="text-gray-900 text-md font-medium"><b>Detalles</b></p>
                                        <div className="w-full pb-2 border-b border-gray-100 flex-wrap">
                                            <h6>Precio Unitario: Bs. {product.price}</h6>
                                            {responsePrice || design && (
                                                <>
                                                    {responsePrice && (
                                                        <>
                                                            <p>Precio Extra: Bs. {responsePrice}</p>
                                                            <h6>Precio Total: <b>Bs. {product.price * data.quantity + parseFloat(responsePrice)}</b></h6>
                                                        </>
                                                    )}
                                                    {design && (
                                                        <>
                                                            <p>Precio Extra: Bs. {design.price}</p>
                                                            <h6>Precio Total: <b>Bs. {product.price * data.quantity + parseFloat(design.price)}</b></h6>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            {!responsePrice || !design && (
                                                <h6>Precio Total: <b>Bs. {product.price * data.quantity}</b></h6>
                                            )}
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
                <Modal show={confirmingDesign} onClose={closeModal}>
                    <div class="relative p-4 w-full max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <form action="" onSubmit={handleSubmit}>
                                <input type="hidden" id="price" name="price"/>
                                <div class="flex items-center justify-between md:p-2 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        NUEVO DISEÑO
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <button
                                        onClick={closeModal}
                                        type="button">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                        </button>
                                    </button>
                                </div>
                                <div class="flex justify-center">
                                    <div class="flex flex-col md:flex-row items-center md:space-x-16">
                                        <div class="flex flex-wrap">
                                            <img src={'/storage/' + selectedImage} alt={selectedImage} className="object-cover my-auto mx-auto h-full" width={200}/>
                                        </div>
                                        <div class="flex flex-col items-center md:flex-row md:items-center">
                                            {!showFileInput && (
                                                <button 
                                                    onClick={toggleFileInput}
                                                    type="button"
                                                    className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-blue-indigo rounded">
                                                    <i className="fas fa-upload mr-2"></i> SUBIR DISEÑO
                                                </button>
                                            )}
                                            {showFileInput && (
                                                <label for="image" class="flex flex-col items-center justify-center w-72 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 my-2">
                                                    <input id="image" type="file" name="image" class="hidden" onChange={(e) => {
                                                        const previewImage = document.getElementById('preview-image');
                                                        const placeholderContainer = document.querySelector('.placeholder-container');
                                                        if (e.target.files && e.target.files[0]) {
                                                            previewImage.src = URL.createObjectURL(e.target.files[0]);
                                                            previewImage.classList.remove('hidden');
                                                            placeholderContainer.classList.add('hidden');
                                                        } else {
                                                            previewImage.src = '';
                                                            previewImage.classList.add('hidden');
                                                            placeholderContainer.classList.remove('hidden');
                                                        }
                                                    }} />
                                                    <img id="preview-image" name="design_image" src="" alt="" className="object-cover hidden" width={170}/>
                                                    <div class="placeholder-container flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                        </svg>
                                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Dale clic para subir</span> o arrastra y suelta.</p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400 mx-10">SVG, PNG, JPG o GIF</p>
                                                    </div>
                                                    <select
                                                        id="technique"
                                                        name="technique"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 mt-2"
                                                        onChange={(e) => {
                                                            const selectedTechnique = e.target.value;
                                                            let newPrice = 0;
                                                            switch (selectedTechnique) {
                                                                case 'SUBLIMACIÓN':
                                                                    newPrice = 25;
                                                                    break;
                                                                case 'SERIGRAFÍA':
                                                                    newPrice = 20;
                                                                    break;
                                                                case 'BORDADO':
                                                                    newPrice = 35;
                                                                    break;
                                                                default:
                                                                    newPrice = 0;
                                                            }
                                                            document.getElementById('price').value = newPrice; // Cambiar el valor del input directamente
                                                        }}
                                                    >
                                                        <option selected disabled hidden>TÉCNICA</option>
                                                        <option value="SUBLIMACIÓN">SUBLIMACIÓN</option>
                                                        <option value="SERIGRAFÍA">SERIGRAFÍA</option>
                                                        <option value="BORDADO">BORDADO</option>
                                                    </select>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-right p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button 
                                        type="submit" 
                                        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 rounded-full"
                                    >
                                        ACEPTAR
                                    </button>

                                    <button onClick={closeModal} data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 rounded-full">CANCELAR</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </section>
        </AuthenticatedLayout>
    );
}