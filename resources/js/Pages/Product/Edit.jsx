import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, product, allSizes, allCategories, selectedSizes, selectedCategories }) {
    const { data, setData, put, errors, reset } = useForm({
        name: product.name || "",
        description: product.description || "",
        sleeve: product.sleeve || "",
        price: product.price || "",
        stock: product.stock || "",
        selectedSizes: selectedSizes.map(size => size.id),
        selectedCategories: selectedCategories.map(category => category.id),
        _method: "PUT",
    });

    useEffect(() => {
        reset({
            name: product.name || "",
            description: product.description || "",
            sleeve: product.sleeve || "",
            price: product.price || "",
            stock: product.stock || "",
            selectedSizes: selectedSizes.map(size => size.id),
            selectedCategories: selectedCategories.map(category => category.id),
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
                            <label class="inline-flex items-center w-full cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer"/>
                                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">PUBLICADO</span>
                            </label>
                        </div>
                        <div className="mt-4">
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

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="product_categories"
                                value="Categorías Disponibles"
                            />
                            {allCategories.map(category => (
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
                                    <span className="ml-2">{category.name}</span>
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
