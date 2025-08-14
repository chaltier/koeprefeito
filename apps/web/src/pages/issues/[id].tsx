import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Badge } from "@koeprefeito/ui";
import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { VoteButton } from "~/components/VoteButton";
import { IssueCategory, IssueStatus, IssuePriority } from "@koeprefeito/database";

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

const priorityLabels: Record<IssuePriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

const statusColors: Record<IssueStatus, "info" | "warning" | "success" | "secondary"> = {
  OPEN: "info",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "secondary",
};

const priorityColors: Record<IssuePriority, "default" | "warning" | "error"> = {
  LOW: "default",
  MEDIUM: "default",
  HIGH: "warning",
  URGENT: "error",
};

export default function IssuePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const [voteCount, setVoteCount] = useState(0);

  const { data: issue, isLoading, error } = api.issues.getById.useQuery(
    { id: id as string },
    { 
      enabled: !!id,
      onSuccess: (data) => {
        setVoteCount(data.votes?.length || 0);
      }
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando solicitação...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !issue) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Solicitação não encontrada</h1>
            <p className="text-gray-600 mb-6">A solicitação que você está procurando não existe ou foi removida.</p>
            <Link href="/issues">
              <Button>Voltar para lista</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{issue.title} - KoePrefeito</title>
        <meta name="description" content={issue.description} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/issues" className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {issue.title}
            </h1>
          </div>
          
          {/* Status and metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Badge variant={statusColors[issue.status]}>
                {statusLabels[issue.status]}
              </Badge>
              <Badge variant="outline">
                {categoryLabels[issue.category]}
              </Badge>
              <Badge variant={priorityColors[issue.priority]}>
                Prioridade {priorityLabels[issue.priority]}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Descrição</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {issue.description}
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Localização</h2>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900">{issue.address}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Coordenadas: {issue.latitude}, {issue.longitude}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Comentários ({issue.comments?.length || 0})
                  </h2>
                  {session && (
                    <Button size="sm">
                      Adicionar comentário
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {issue.comments && issue.comments.length > 0 ? (
                  <div className="space-y-4">
                    {issue.comments.map((comment) => (
                      <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {comment.author.name}
                          </span>
                          {comment.isOfficial && (
                            <Badge variant="info" size="sm">
                              Oficial
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(comment.createdAt))}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>Nenhum comentário ainda</p>
                    <p className="text-sm">Seja o primeiro a comentar nesta solicitação</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Solicitante</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {issue.author.image && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={issue.author.image}
                      alt={issue.author.name || ""}
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{issue.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(issue.createdAt))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assigned To */}
            {issue.assignedTo && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Responsável</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    {issue.assignedTo.image && (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={issue.assignedTo.image}
                        alt={issue.assignedTo.name || ""}
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{issue.assignedTo.name}</p>
                      <p className="text-sm text-gray-500">
                        {issue.assignedTo.role === "ADMIN" ? "Administrador" : 
                         issue.assignedTo.role === "MODERATOR" ? "Moderador" : "Funcionário"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Estatísticas</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Votos</span>
                    <span className="font-medium">{voteCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Comentários</span>
                    <span className="font-medium">{issue.comments?.length || 0}</span>
                  </div>
                  {issue.resolvedAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resolvido em</span>
                      <span className="font-medium text-sm">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(issue.resolvedAt))}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {session && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Ações</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <VoteButton
                      issueId={issue.id}
                      initialVotes={voteCount}
                      userVote={issue.userVote as "UP" | "DOWN" | null}
                      onVoteChange={setVoteCount}
                    />
                    <Button className="w-full" variant="outline">
                      📤 Compartilhar
                    </Button>
                    {session?.user?.id === issue.authorId && (
                      <Button className="w-full" variant="outline">
                        ✏️ Editar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}