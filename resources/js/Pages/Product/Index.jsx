import { useState } from 'react';
import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Alert from '@/Components/Alert';
import Modal from '@/Components/Modal';
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, products, success, error, queryParams = null }) {
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { delete: destroy } = useForm();

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("product.index"), queryParams);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("product.index"), queryParams);
    };


    const openDeleteModal = (id) => {
        setSelectedProductId(id);
        setConfirmingDelete(true);
    };

    const closeDeleteModal = () => {
        setSelectedProductId(null);
        setConfirmingDelete(false);
    };

    const handleDelete = () => {
        destroy(route('product.destroy', selectedProductId));
        closeDeleteModal();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Productos" />
            <div className="flex justify-end pr-28 mt-5">
                <Link
                    href={route("product.create")}
                    className="inline-flex items-center text-md px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                   <i class="fas fa-plus-circle mr-2"></i>
                    NUEVO
                </Link>
            </div>
            {success && (
                <Alert type="success" className="my-3 mx-10">
                    {success}
                </Alert>
            )}
            {error && (
                <Alert type="error" className="my-3 mx-10">
                    {error}
                </Alert>
            )}
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full rounded-lg">
                                                <thead className="border-b">
                                                    <tr>
                                                        <TableHeading
                                                            name="name"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Nombre
                                                        </TableHeading>
                                                        <TableHeading
                                                            name="price"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Precio
                                                        </TableHeading>
                                                        <TableHeading
                                                            name="sleeve"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Manga
                                                        </TableHeading>
                                                        <TableHeading
                                                            name="stock"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Stock
                                                        </TableHeading>
                                                        <TableHeading
                                                            name="published"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Publicación
                                                        </TableHeading>
                                                        <TableHeading
                                                            name="created_at"
                                                            sort_field={queryParams.sort_field}
                                                            sort_direction={queryParams.sort_direction}
                                                            sortChanged={sortChanged}>
                                                            Fecha de Creación
                                                        </TableHeading>
                                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.data.map(product => (
                                                        <tr className="border-b" key={product.id}>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{product.name}</td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">Bs. {product.price}</td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{product.sleeve}</td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{product.stock}</td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                                {product.published ? (
                                                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-md font-medium border border-teal-500 text-teal-500">PUBLICADO</span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-md font-medium border border-red-500 text-red-500">NO PUBLICADO</span>
                                                                )}
                                                            </td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{product.created_at}</td>
                                                            <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                                <Link
                                                                    href={route("product.show", product.id)}
                                                                    className="bg-transparent hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded inline-block align-middle me-2">
                                                                    Detalles
                                                                </Link>
                                                                <Link
                                                                    href={route("product.edit", product.id)}
                                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block align-middle me-2">
                                                                    Editar
                                                                </Link>
                                                                <button
                                                                    onClick={() => openDeleteModal(product.id)}
                                                                    type="button"
                                                                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded inline-block align-middle">
                                                                    Eliminar
                                                                </button>
                                                            </td>
                                                        </tr>
                                                     ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                            <Pagination links={products.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={confirmingDelete} onClose={closeDeleteModal}>
                <div className="relative p-4 w-full max-h-full">
                   <div className="text-center p-5 flex-auto justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h2 className="text-xl font-bold py-4 ">¿Estás Seguro/a?</h2>
                        <p className="text-sm text-gray-500 px-8">¿Quieres eliminar este producto?</p>
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button
                            type="button"
                            onClick={closeDeleteModal}
                            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            CANCELAR
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                            ELIMINAR
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}