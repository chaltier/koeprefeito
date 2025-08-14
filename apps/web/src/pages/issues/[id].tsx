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
import { CommentForm } from "~/components/CommentForm";
import { CommentsList } from "~/components/CommentsList";
import { ImageModal } from "~/components/ImageModal";
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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: issue, isLoading, error, refetch } = api.issues.getById.useQuery(
    { id: id as string },
    { 
      enabled: !!id,
      onSuccess: (data) => {
        setVoteCount(data.votes?.length || 0);
      }
    }
  );

  const handleCommentAdded = () => {
    refetch();
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

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

            {/* Images */}
            {issue.images && issue.images.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Fotos ({issue.images.length})
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {issue.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group cursor-pointer hover:shadow-lg transition-all duration-200"
                        onClick={() => openImageModal(index)}
                      >
                        <img
                          src={image}
                          alt={`Foto ${index + 1} da solicitação`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.parentElement!.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                                <span class="ml-2 text-sm">Erro ao carregar</span>
                              </div>
                            `;
                          }}
                        />
                        {/* Overlay de ampliação */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    💡 Clique nas imagens para visualizar em tamanho maior
                  </p>
                </CardContent>
              </Card>
            )}

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
                <h2 className="text-xl font-semibold text-gray-900">
                  Comentários ({issue.comments?.length || 0})
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Comment Form */}
                <CommentForm 
                  issueId={issue.id} 
                  onCommentAdded={handleCommentAdded}
                />
                
                {/* Comments List */}
                <div className="border-t pt-6">
                  <CommentsList comments={issue.comments || []} />
                </div>
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tempo ativo</span>
                    <span className="font-medium text-sm">
                      {(() => {
                        const now = new Date();
                        const created = new Date(issue.createdAt);
                        const diffTime = Math.abs(now.getTime() - created.getTime());
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        
                        if (diffDays > 0) {
                          return `${diffDays}d ${diffHours}h`;
                        } else if (diffHours > 0) {
                          return `${diffHours}h`;
                        } else {
                          const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
                          return `${diffMinutes}m`;
                        }
                      })()
                    }</span>
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
                      <Link href={`/issues/${issue.id}/edit`}>
                        <Button className="w-full" variant="outline">
                          ✏️ Editar
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {issue.images && issue.images.length > 0 && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          images={issue.images}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      )}
    </Layout>
  );
}