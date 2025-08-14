import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Badge } from "@koeprefeito/ui";
import { Input } from "@koeprefeito/ui";
import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { VoteButton } from "~/components/VoteButton";
import { IssueCategory, IssueStatus } from "@koeprefeito/database";

const categoryLabels: Record<IssueCategory, string> = {
  INFRASTRUCTURE: "Infraestrutura",
  SECURITY: "Segurança",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  ENVIRONMENT: "Meio Ambiente",
  TRANSPORT: "Transporte",
  OTHER: "Outros",
};

const statusLabels: Record<IssueStatus, string> = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em Andamento",
  RESOLVED: "Resolvido",
  CLOSED: "Fechado",
};

const statusColors: Record<IssueStatus, "info" | "warning" | "success" | "secondary"> = {
  OPEN: "info",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "secondary",
};

export default function IssuesPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | "ALL">("ALL");

  const { data: issues, isLoading, error } = api.issues.getAll.useQuery({
    limit: 20,
    category: selectedCategory === "ALL" ? undefined : selectedCategory,
    status: selectedStatus === "ALL" ? undefined : selectedStatus,
  });

  // Filter issues by search query on client side
  const filteredIssues = issues?.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <Layout>
      <Head>
        <title>Issues - KoePrefeito</title>
        <meta name="description" content="Lista de solicitações dos cidadãos" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Solicitações da Comunidade
              </h1>
              <p className="mt-2 text-gray-600">
                Veja todas as solicitações enviadas pelos cidadãos
              </p>
            </div>
            {session && (
              <Link href="/issues/new">
                <Button>
                  Nova Solicitação
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <Input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as IssueCategory | "ALL")}
              >
                <option value="ALL">Todas as categorias</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as IssueStatus | "ALL")}
              >
                <option value="ALL">Todos os status</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setSelectedStatus("ALL");
                }}
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando solicitações...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar</h3>
            <p className="text-gray-600">Não foi possível carregar as solicitações.</p>
          </div>
        )}

        {/* Issues List */}
        {!isLoading && !error && (
          <>
            {filteredIssues.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma solicitação encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL"
                    ? "Tente ajustar os filtros de busca."
                    : "Seja o primeiro a enviar uma solicitação para a prefeitura."}
                </p>
                {session && (
                  <Link href="/issues/new">
                    <Button>
                      Criar primeira solicitação
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-4 text-sm text-gray-600">
                  {filteredIssues.length} solicitação(ões) encontrada(s)
                </div>
                
                {filteredIssues.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href={`/issues/${issue.id}`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {issue.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {issue.description}
                            </p>
                            
                            {/* Imagens da solicitação */}
                            {issue.images && issue.images.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {issue.images.slice(0, 3).map((image, index) => (
                                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                      src={image}
                                      alt={`Foto ${index + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                ))}
                                {issue.images.length > 3 && (
                                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                                    +{issue.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex flex-col items-end gap-2">
                            <Badge variant={statusColors[issue.status]}>
                              {statusLabels[issue.status]}
                            </Badge>
                            <Badge variant="outline">
                              {categoryLabels[issue.category]}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>Por {issue.author.name}</span>
                            {issue.address && (
                              <span className="flex items-center gap-1">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {issue.address}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707a1 1 0 01-1.414 0L8 16H5z" />
                              </svg>
                              {issue._count?.comments || 0}
                            </span>
                            <span className="flex items-center gap-1 text-primary-600 font-medium">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {(() => {
                                const now = new Date();
                                const created = new Date(issue.createdAt);
                                const diffTime = Math.abs(now.getTime() - created.getTime());
                                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                                const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                
                                if (diffDays > 0) {
                                  return `${diffDays}d`;
                                } else if (diffHours > 0) {
                                  return `${diffHours}h`;
                                } else {
                                  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
                                  return `${diffMinutes}m`;
                                }
                              })()}
                            </span>
                            <time dateTime={issue.createdAt.toISOString()}>
                              {new Intl.DateTimeFormat("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }).format(new Date(issue.createdAt))}
                            </time>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <VoteButton
                            issueId={issue.id}
                            initialVotes={issue._count?.votes || 0}
                            userVote={null} // We'd need to enhance the getAll query to include user votes
                          />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}