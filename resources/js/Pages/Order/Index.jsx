import { useState } from 'react';
import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Alert from '@/Components/Alert';
import Modal from '@/Components/Modal';
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, orders, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("order.index"), queryParams);
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
        router.get(route("order.index"), queryParams);
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Compras" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-16">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg sm:rounded-lg">
                    <div className="p-6 text-gray-200 dark:text-gray-100 pb-80">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        {orders.data.length === 0 ? (
                                                <h2 class="title font-manrope font-bold text-2xl leading-10 mb-2 text-center text-gray-600 dark:text-white my-14">
                                                    No hay registros disponibles
                                                </h2>
                                            ) : (
                                                <table className="min-w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                                                    <thead className=" bg-gray-900">
                                                        <tr className="text-white">
                                                            <th scope="col">Usuario</th>
                                                            <th scope="col">Estado de Pago</th>
                                                            <th scope="col">Método de Envío</th>
                                                            <TableHeading
                                                                name="total_amount"
                                                                sort_field={queryParams.sort_field}
                                                                sort_direction={queryParams.sort_direction}
                                                                sortChanged={sortChanged}
                                                            >
                                                                Monto
                                                            </TableHeading>
                                                            <th scope="col">Moneda</th>
                                                            <TableHeading
                                                                name="created_at"
                                                                sort_field={queryParams.sort_field}
                                                                sort_direction={queryParams.sort_direction}
                                                                sortChanged={sortChanged}
                                                            >
                                                                Fecha de Pedido
                                                            </TableHeading>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.data.map(order => (
                                                            <tr key={order.id}>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">{order.user.name}</td>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                                                    {order.payment_id ? "PAGADO" : "NO PAGADO"}
                                                                </td>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">{order.shipping.name}</td>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">{order.total_amount}</td>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">{order.currency}</td>
                                                                <td className="text-md text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">{order.created_at}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination links={orders.meta.links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
