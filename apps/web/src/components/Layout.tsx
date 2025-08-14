import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@koeprefeito/ui";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader = true }: LayoutProps) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!showHeader) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl lg:text-3xl font-bold text-primary-600">
                KoePrefeito
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/issues"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Solicitações
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Contato
              </Link>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || ""}
                    />
                  )}
                  <Link href="/dashboard">
                    <Button variant="primary" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="primary" size="sm">
                    Entrar
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Abrir menu principal</span>
                {!mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                <Link
                  href="/issues"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solicitações
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                
                {/* Mobile Auth */}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center px-3">
                        {session.user?.image && (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={session.user.image}
                            alt={session.user.name || ""}
                          />
                        )}
                        <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">{session.user?.name}</div>
                          <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                        </div>
                      </div>
                      <div className="px-3">
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full" variant="primary" size="sm">
                            Dashboard
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="px-3">
                      <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full" variant="primary" size="sm">
                          Entrar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                KoePrefeito
              </Link>
              <p className="mt-2 text-gray-600 max-w-md">
                Conectando cidadãos e governo municipal para uma cidade melhor.
                Sua voz importa na transformação do seu município.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Plataforma
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/issues" className="text-gray-600 hover:text-gray-900">
                    Solicitações
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    Como Funciona
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Suporte
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2025 KoePrefeito. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}