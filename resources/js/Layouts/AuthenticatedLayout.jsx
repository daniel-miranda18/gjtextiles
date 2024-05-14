import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isLoggedIn = user !== null;
    return (
        <div>
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('welcome')} active={route().current('welcome')} iconClass="fas fa-home">
                                    Inicio
                                </NavLink>
                                <NavLink href={route('product.catalog')} active={route().current('product.catalog')} iconClass="fas fa-book">
                                    Catálogo
                                </NavLink>
                                <NavLink href={route('cart.index')} active={route().current('cart.index')} iconClass="fas fa-shopping-cart">
                                    Carrito de Compras
                                </NavLink>
                                {isLoggedIn ? (
                                    <>
                                        {user.role === 'ADMIN' ? (
                                            <>
                                                <NavLink href={route('dashboard')} active={route().current('dashboard')} iconClass="fas fa-tachometer-alt">
                                                    Panel
                                                </NavLink>
                                                <NavLink href={route('product.index')} active={route().current('product.index')} iconClass="fas fa-tshirt">
                                                    Productos
                                                </NavLink>
                                                <NavLink href={route('design.index')} active={route().current('design.index')} iconClass="fas fa-paint-brush">
                                                    Diseños
                                                </NavLink>
                                            </>
                                        ) : (
                                            null
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <NavLink href={route('login')} active={route().current('dashboard')} iconClass="fas fa-sign-in-alt">
                                            Iniciar Sesión
                                        </NavLink>
                                        <NavLink href={route('register')} active={route().current('product.index')} iconClass="fas fa-user-plus">
                                            Registrate
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {isLoggedIn ? (
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Mi Perfil</Dropdown.Link>
                                            <Dropdown.Link>Mi Carrito</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Cerrar Sesión
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <>
                                <div className="ms-3 relative">
                                    
                                </div>
                                </>
                            )}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {isLoggedIn ? (
                            <>
                            {user.role === 'ADMIN' ? (
                                    <>
                                        <ResponsiveNavLink href={route('dashboard')}>
                                            Panel
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('product.index')}>
                                            Productos
                                        </ResponsiveNavLink>
                                    </>
                                ) : (
                                    null
                                )}
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink href={route('welcome')}>
                                    Inicio
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('product.catalog')}>
                                    Catálogo
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('cart.index')}>
                                    Carrito de Compras
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            {isLoggedIn && (
                                <>
                                    <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </>
                            )}
                        </div>

                        <div className="mt-3 space-y-1">
                            {isLoggedIn && (
                                <>
                                    <ResponsiveNavLink href={route('profile.edit')}>Mi Perfil</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Cerrar Sesión
                                    </ResponsiveNavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}