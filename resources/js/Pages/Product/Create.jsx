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
import SelectInput from '@/Components/SelectInput';
import axios from 'axios';

export default function Create({ auth, colors, sizes, categories }){
    const [confirmingNewColor, setNewColor] = useState(false);
    const [confirmingNewSize, setNewSize] = useState(false);
    const [confirmingNewCategory, setNewCategory] = useState(false);
    const {data, setData, post, errors} = useForm({
        name: "",
        description: "",
        sleeve: "",
        price: "",
        stock: "",
        selectedColors: [],
        selectedSizes: [],
        selectedCategories: [],
        colorImages: [],
        color: "",
        size: "",
        category: "",
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

    const addNewCategory = () => {
        setNewCategory(true);
    };

    const closeModal = () => {
        setNewColor(false);
        setNewSize(false);
        setNewCategory(false);
    };

    const submitNewColor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("color.store"), { color: data.color });
            const newColor = response.data;
            colors.push(newColor);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const submitNewSize = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("size.store"), { size: data.size });
            const newSize = response.data;
            sizes.push(newSize);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const submitNewCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("category.store"), { category: data.category });
            const newCategory = response.data;
            categories.push(newCategory);
            closeModal();
        } catch (error) {
            console.error(error);
        }
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
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nombre"
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
                            htmlFor="product_sleeve"
                            value="Tipo de Manga"
                            />
                            <SelectInput
                            name="sleeve"
                            id="product_sleeve"
                            className="mt-1 block w-full"
                            value={data.sleeve}
                            onChange={(e) => setData("sleeve", e.target.value)}
                            >
                                <option value="">Seleccione Manga</option>
                                <option value="CORTO">Corto</option>
                                <option value="LARGO">Largo</option>
                                <option value="SIN MANGA">Sin Manga</option>
                                <option value="3/4">3/4</option>
                            </SelectInput>
                            <InputError
                            message={errors.sleeve} className="mt-2"
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
                            onChange={(e) => setData("price", e.target.value)}
                            placeholder="Precio"
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
                            onChange={(e) => setData("stock", e.target.value)}
                            placeholder="Stock"
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
                                <i class="fas fa-plus-circle mr-2"></i>
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
                                <i class="fas fa-plus-circle mr-2"></i>
                                NUEVA TALLA
                            </PrimaryButton>
                        </div>

                        <div className="mt-4">
                            <InputLabel 
                            htmlFor="product_categories"
                            value="Categorias Disponibles"
                            />
                            {categories.length === 0 ? (
                                <>
                                    <p>No hay categorias disponibles.</p>
                                </>
                            ) : (
                                categories.map(category => (
                                    <label key={category.id} className="inline-flex items-center mt-2 mr-10">
                                        <Checkbox
                                            id={`category_${category.id}`}
                                            name="selectedCategories"
                                            value={category.id}
                                            checked={data.selectedCategories.includes(category.id)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setData("selectedCategories", isChecked ? [...data.selectedCategories, category.id] : data.selectedCategories.filter(id => id !== category.id));
                                            }}
                                        />
                                        <InputError
                                        message={errors.selectedCategories} className="mt-2"
                                        />
                                        <span className="ml-2">{category.name}</span>
                                    </label>
                                ))
                            )}

                            <PrimaryButton
                                onClick={addNewCategory}
                                type="button"
                                className="block text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-emerald-700 dark:focus:ring-blue-800 mt-2"
                            >
                                <i class="fas fa-plus-circle mr-2"></i>
                                NUEVA CATEGORÍA
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
                                    onChange={(e) => setData("color", e.target.value)}
                                    placeholder="Color"
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
                                    onChange={(e) => setData("size", e.target.value)}
                                    placeholder="Talla"
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

            <Modal show={confirmingNewCategory} onClose={closeModal}>
                <div class="relative p-4 w-full max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Nueva Categoría
                            </h3>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={submitNewCategory} className="space-y-4">
                                <div>
                                <InputLabel 
                                    htmlFor="new_category"
                                    value="Categoría"/>
                                <TextInput
                                    id="new_category"
                                    type="text"
                                    value={data.category}
                                    name="category"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("category", e.target.value)}
                                    placeholder="Categoría"
                                    required
                                />
                                <InputError
                                    message={errors.category} className="mt-2"
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