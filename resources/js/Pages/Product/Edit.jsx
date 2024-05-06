import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, product, allColors, allSizes, selectedColors, selectedSizes, selectedColorsWithImages  }) {
    const { data, setData, put, errors, reset } = useForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        selectedColors: selectedColors.map(color => color.id),
        selectedSizes: selectedSizes.map(size => size.id),
        _method: "PUT",
    });

    useEffect(() => {
        reset({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            selectedColors: selectedColors.map(color => color.id),
            selectedSizes: selectedSizes.map(size => size.id),
            _method: "PUT",
        });
    }, [product]);


    const onSubmit = (e) => {
        e.preventDefault();
        put(route("product.update", product.id));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar Producto" />
            <div className="py-5">
                <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg mx-10 shadow-lg">
                    <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div>
                            <InputLabel
                                htmlFor="product_name"
                                value="Nombre"
                            />
                            <TextInput
                                id="product_name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="product_description"
                                value="Descripción"
                            />
                            <TextAreaInput
                                id="product_description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="product_price"
                                value="Precio"
                            />
                            <TextInput
                                id="product_price"
                                type="text"
                                name="price"
                                value={data.price}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("price", e.target.value)}
                            />
                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="product_stock"
                                value="Stock"
                            />
                            <TextInput
                                id="product_stock"
                                type="text"
                                name="stock"
                                value={data.stock}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("stock", e.target.value)}
                            />
                            <InputError
                                message={errors.stock}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_colors" value="Colores Disponibles" />
                            {allColors.map(color => (
                                <div key={color.id} className="items-center mt-2 mx-auto">
                                    <Checkbox
                                        id={`color_${color.id}`}
                                        name="selectedColors"
                                        value={color.id}
                                        checked={data.selectedColors.includes(color.id)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setData("selectedColors", isChecked ? [...data.selectedColors, color.id] : data.selectedColors.filter(id => id !== color.id));
                                        }}
                                    />
                                    <span className="mx-4">{color.name}</span>
                                    {data.selectedColors.includes(color.id) && (
                                        <>
                                           {selectedColorsWithImages.map(color => (
                                                <div key={color.id}>
                                                    <h3>{color.image}</h3>
                                                    <div>
                                                        {color.images.filter(image => data.selectedColors.includes(color.id)).map(image => (
                                                            <img key={image.id} src={image.image} alt={image.image} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <input
                                                type="file"
                                                name={`color_images_${color.id}`}
                                                className="my-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    const colorId = color.id;
                                                    const updatedImages = [...data.colorImages, { colorId, file }];
                                                    setData("colorImages", updatedImages);
                                                }}
                                            />
                                            <p className="ms-10 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG o JPG (MAX. 800x400px).</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="product_sizes"
                                value="Tallas Disponibles"
                            />
                            {allSizes.map(size => (
                                <label key={size.id} className="inline-flex items-center mt-2 mr-10">
                                    <Checkbox
                                        id={`size_${size.id}`}
                                        name="selectedSizes"
                                        value={size.id}
                                        checked={data.selectedSizes.includes(size.id)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setData("selectedSizes", isChecked ? [...data.selectedSizes, size.id] : data.selectedSizes.filter(id => id !== size.id));
                                        }}
                                    />
                                    <span className="ml-2">{size.name}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-4 text-right">
                            <Link
                                href={route("product.index")}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                            >
                                CANCELAR
                            </Link>

                            <button className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                ENVIAR DATOS
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}