import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    name: "",
    price: "",
    image: "",
    technique: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("design.store_admin"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Nuevo Diseño" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 shadow-lg">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div>
                    <InputLabel 
                    htmlFor="design_name"
                    value="Nombre *"
                    />
                    <TextInput
                    id="design_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Nombre"
                    />
                    <InputError
                    message={errors.name} className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel 
                    htmlFor="design_price"
                    value="Precio *"
                    />
                    <TextInput
                    id="design_price"
                    type="text"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("price", e.target.value)}
                    placeholder="Precio"
                    />
                    <InputError
                    message={errors.price} className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel 
                    htmlFor="design_image"
                    value="Imagen *"
                    />
                    <TextInput
                    id="design_image"
                    type="file"
                    name="image"
                    className="my-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <InputError
                    message={errors.image} className="mt-2"
                    />
                    <p class="ms-10 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG o JPG (MAX. 800x400px).</p>
                </div>

                <div className="mt-4">
                    <InputLabel 
                    htmlFor="product_technique"
                    value="Técnica *"
                    />
                    <SelectInput
                    name="technique"
                    id="product_technique"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("technique", e.target.value)}
                    >
                        <option value="">Seleccione Técnica</option>
                        <option value="SUBLIMACIÓN">Sublimación</option>
                        <option value="SERIGRAFÍA">Serigrafía</option>
                        <option value="BORDADO">Bordado</option>
                    </SelectInput>
                    <InputError
                    message={errors.sleeve} className="mt-2"
                    />
                </div>

                <div className="mt-4 text-right">
                    <Link href={route("design.index")}
                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                    >
                        CANCELAR
                    </Link>

                    <button className="mt-6 inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        ENVIAR DATOS
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}