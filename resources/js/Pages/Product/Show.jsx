import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, product, colors, sizes, images }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Detalles de Publicación" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Nombre</label>
                    <p className="mt-1">{product.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Descripción</label>
                    <p className="mt-1">{product.description}</p>
                  </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Tallas Disponibles</label>
                        <div className="flex flex-wrap mt-1">
                            {sizes.map(size => (
                                <div key={size.id} className="mr-4 mb-4">
                                    <div className="rounded-full bg-indigo-500 text-white p-4 text-xl">{size.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Tipo de Manga</label>
                    <p className="mt-1">{product.sleeve}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Precio</label>
                    <p className="mt-1">{product.price}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Stock</label>
                    <p className="mt-1">{product.stock}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Publicado</label>
                    <p className="mt-1">{product.published ? 'Sí' : 'No'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Colores Disponibles</label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                    {colors.map(color => (
                        <>
                        <div key={color.id} className="flex items-center">
                            <p className="ml-2">{color.name}</p>
                        </div>
                        {images.find(img => img.id === color.id)?.images.map(image => (
                            <img key={image.id} src={'/storage/'+image.image} alt={image.image} width={100}/>
                        ))}
                        </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}