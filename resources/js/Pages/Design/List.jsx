import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function List({ auth, designs, product }) {
  const [selectedDesignId, setSelectedDesignId] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { route } = usePage();

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleDesignSelection = async (design) => { 
    try {
      setSelectedDesignId(design.id); 
      const designDetails = encodeURIComponent(JSON.stringify(design));
      window.location.href = `/product/personalize/${product.id}?design_details=${designDetails}`;
    } catch (error) {
      console.error("Error al seleccionar el diseño:", error);
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Detalles de Publicación" />
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-2 text-gray-900 dark:text-gray-100">
              <h1 className="lg:text-5xl font-bold leading-tight text-3xl text-black text-center">Selecciona diseño para {product.name} </h1><br />
              <div className="flex items-center justify-center py-4 md:py-5 flex-wrap">
              <Link href={`/designs/list/${product.id}`} className="text-indigo-700 hover:text-white border border-indigo-600 bg-white hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:bg-gray-900 dark:focus:ring-indigo-800">
                Todos los diseños
              </Link>
              <Link href={`/designs/list/${product.id}?technique=SUBLIMACIÓN`} className="text-indigo-700 hover:text-white border border-indigo-600 bg-white hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:bg-gray-900 dark:focus:ring-indigo-800">
                Sublimación
              </Link>
              <Link href={`/designs/list/${product.id}?technique=SERIGRAFÍA`} className="text-indigo-700 hover:text-white border border-indigo-600 bg-white hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:bg-gray-900 dark:focus:ring-indigo-800">
                Serigrafía
              </Link>
              <Link href={`/designs/list/${product.id}?technique=BORDADO`} className="text-indigo-700 hover:text-white border border-indigo-600 bg-white hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:bg-gray-900 dark:focus:ring-indigo-800">
                Bordado
              </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {designs.map((design, index) => (
                  <div 
                    key={index} 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img 
                      className="h-auto max-w-full rounded-lg" 
                      src={`/storage/${design.image}`} 
                      alt={design.name} 
                    />
                    {hoverIndex === index && (
                      <div className="absolute inset-0 left-0 right-0 p-4 bg-black bg-opacity-75 rounded-lg flex flex-col items-center">
                        <h1 className="lg:text-xl font-bold leading-tight text-3xl text-white text-center pt-16">Precio Extra: Bs. {design.price}</h1>
                        <h1 className="lg:text-xl font-bold leading-tight text-3xl text-white text-center pt-2">Técnica: {design.technique}</h1>
                        <button 
                          className="text-yellow-500 hover:text-white border border-yellow-400 bg-transparent hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-400 dark:bg-gray-900 dark:focus:ring-yellow-400 mt-5"
                          onClick={() => handleDesignSelection(design)}
                        >
                          SELECCIONAR DISEÑO
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
