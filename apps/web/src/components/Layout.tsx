import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@koeprefeito/ui";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader = true }: LayoutProps) {
  const { data: session } = useSession();

  if (!showHeader) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-primary-600">
                KoePrefeito
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/issues"
                className="text-gray-600 hover:text-gray-900"
              >
                Solicitações
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900"
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contato
              </Link>
            </nav>

            <div className="flex items-center gap-4">
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
          </div>
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
              © 2024 KoePrefeito. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}