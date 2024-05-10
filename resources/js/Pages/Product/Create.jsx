import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Create({ auth, colors, sizes }){
    const [confirmingNewColor, setNewColor] = useState(false);
    const [confirmingNewSize, setNewSize] = useState(false);
    const {data, setData, post, errors, reset} = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        selectedColors: [],
        selectedSizes: [],
        colorImages: [],
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("product.store"));
    }

    const addNewColor = () => {
        setNewColor(true);
    };

    const addNewSize = () => {
        setNewSize(true);
    };

    const closeModal = () => {
        setNewColor(false);
        setNewSize(false);
        reset();
    };

    const submitNewColor = (e) => {
        e.preventDefault();
        post(route("color.store"));
        closeModal();
    };

    const submitNewSize = (e) => {
        e.preventDefault();
        post(route("size.store"));
        closeModal();
    };

    const onChangeColor = (e) => {
        const { value } = e.target;
        setData("color", value);
    };

    const onChangeSize = (e) => {
        const { value } = e.target;
        setData("size", value);
    };

    return(
        <AuthenticatedLayout user={auth.user}>
            <Head title="Nuevo Producto" />
            <div className="py-5">
                <div className=" dark:bg-gray-800 overflow-hidden sm:rounded-lg mx-10 shadow-lg">
                    <form onSubmit={onSubmit}
                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
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
                            placeholder="Ingrese Nombre"
                            />
                            <InputError
                            message={errors.name} className="mt-2"
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
                            message={errors.description} className="mt-2"
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
                            placeholder="Ingrese Precio del Producto"
                            />
                            <InputError
                            message={errors.price} className="mt-2"
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
                            placeholder="Ingrese Stock del Producto"
                            />
                            <InputError
                            message={errors.stock} className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_colors" value="Colores Disponibles" />
                            {colors.length === 0 ? (
                                <>
                                <p>No hay colores disponibles.</p>
                                </>
                            ) : (
                                colors.map(color => (
                                    <div key={color.id} className="inline-flex items-center mt-2 mx-auto">
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
                                        <InputError
                                        message={errors.selectedColors} className="mt-2"
                                        />
                                        <span className="mx-4">{color.name}</span>
                                        {data.selectedColors.includes(color.id) && (
                                            <>
                                            <input 
                                                type="file" 
                                                name="color_images" 
                                                className="my-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    const colorId = color.id;
                                                    const updatedImages = [...data.colorImages, { colorId, file }];
                                                    setData("colorImages", updatedImages);
                                                }}
                                            />
                                            <p class="ms-10 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG o JPG (MAX. 800x400px).</p>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                            <PrimaryButton
                                onClick={addNewColor}
                                type="button"
                                className="block text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-emerald-700 dark:focus:ring-blue-800 mt-2"
                            >
                                NUEVO COLOR
                            </PrimaryButton>
                        </div>

                        <div className="mt-4">
                            <InputLabel 
                            htmlFor="product_sizes"
                            value="Tallas Disponibles"
                            />
                            {sizes.length === 0 ? (
                                <>
                                    <p>No hay tallas disponibles.</p>
                                </>
                            ) : (
                                sizes.map(size => (
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
                                        <InputError
                                        message={errors.selectedSizes} className="mt-2"
                                        />
                                        <span className="ml-2">{size.name}</span>
                                    </label>
                                ))
                            )}

                            <PrimaryButton
                                onClick={addNewSize}
                                type="button"
                                className="block text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-emerald-700 dark:focus:ring-blue-800 mt-2"
                            >
                                NUEVA TALLA
                            </PrimaryButton>
                        </div>

                        <div className="mt-4 text-right">
                            <Link href={route("product.index")}
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
            <Modal show={confirmingNewColor} onClose={closeModal}>
                <div class="relative p-4 w-full max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Nuevo Color
                            </h3>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={submitNewColor} className="space-y-4">
                                <div>
                                <InputLabel 
                                    htmlFor="new_color"
                                    value="Color"/>
                                <TextInput
                                    id="new_color"
                                    type="text"
                                    value={data.color}
                                    name="color"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={onChangeColor}
                                    placeholder="Ingrese Color"
                                    required
                                />
                                <InputError
                                    message={errors.color} className="mt-2"
                                />
                                <PrimaryButton
                                    type="submit"
                                    className="mt-2"
                                >
                                    AGREGAR
                                </PrimaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={closeModal}
                                    className="ms-2">
                                    CANCELAR
                                </DangerButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={confirmingNewSize} onClose={closeModal}>
                <div class="relative p-4 w-full max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Nueva Talla
                            </h3>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={submitNewSize} className="space-y-4">
                                <div>
                                <InputLabel 
                                    htmlFor="new_size"
                                    value="Talla"/>
                                <TextInput
                                    id="new_size"
                                    type="text"
                                    value={data.size}
                                    name="size"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={onChangeSize}
                                    placeholder="Ingrese Talla"
                                    required
                                />
                                <InputError
                                    message={errors.size} className="mt-2"
                                />
                                <PrimaryButton
                                    type="submit"
                                    className="mt-2"
                                >
                                    AGREGAR
                                </PrimaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={closeModal}
                                    className="ms-2">
                                    CANCELAR
                                </DangerButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}