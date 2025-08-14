import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Input } from "@koeprefeito/ui";
import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { IssueCategory, IssuePriority } from "@koeprefeito/database";

const categoryOptions: { value: IssueCategory; label: string }[] = [
  { value: "INFRASTRUCTURE", label: "Infraestrutura" },
  { value: "SECURITY", label: "Segurança" },
  { value: "HEALTH", label: "Saúde" },
  { value: "EDUCATION", label: "Educação" },
  { value: "ENVIRONMENT", label: "Meio Ambiente" },
  { value: "TRANSPORT", label: "Transporte" },
  { value: "OTHER", label: "Outros" },
];

const priorityOptions: { value: IssuePriority; label: string }[] = [
  { value: "LOW", label: "Baixa" },
  { value: "MEDIUM", label: "Média" },
  { value: "HIGH", label: "Alta" },
  { value: "URGENT", label: "Urgente" },
];

export default function EditIssuePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IssueCategory>("OTHER");
  const [priority, setPriority] = useState<IssuePriority>("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: issue, isLoading, error } = api.issues.getById.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const updateIssueMutation = api.issues.update.useMutation({
    onSuccess: () => {
      router.push(`/issues/${id}`);
    },
    onError: (error) => {
      console.error('Erro ao atualizar solicitação:', error);
    },
  });

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
      setDescription(issue.description);
      setCategory(issue.category);
      setPriority(issue.priority);
    }
  }, [issue]);

  // Check if user is authorized to edit this issue
  if (!session) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-6">Você precisa estar logado para editar solicitações.</p>
            <Link href="/auth/signin">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
            <p className="text-gray-600 mb-6">A solicitação que você está tentando editar não existe.</p>
            <Link href="/issues">
              <Button>Voltar para lista</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Check if user owns this issue
  if (session.user.id !== issue.authorId) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-6">Você só pode editar suas próprias solicitações.</p>
            <Link href={`/issues/${id}`}>
              <Button>Voltar para solicitação</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      await updateIssueMutation.mutateAsync({
        id: id as string,
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
      });
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Editar Solicitação - KoePrefeito</title>
        <meta name="description" content="Editar solicitação para a prefeitura" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/issues/${id}`} className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Editar Solicitação
            </h1>
          </div>
          <p className="text-gray-600">
            Faça as alterações necessárias na sua solicitação para a Prefeitura de Maricá.
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Informações da Solicitação</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Descreva brevemente o problema..."
                  required
                  maxLength={100}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {title.length}/100 caracteres
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva detalhadamente o problema, sua localização e outras informações relevantes..."
                  required
                  rows={6}
                  maxLength={1000}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {description.length}/1000 caracteres
                </p>
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IssueCategory)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade *
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as IssuePriority)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                  >
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note about images */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">
                      <strong>Observação:</strong> Não é possível editar imagens ou localização após criar a solicitação. 
                      Se precisar alterar essas informações, entre em contato conosco.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !description.trim()}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    '💾 Salvar Alterações'
                  )}
                </Button>
                <Link href={`/issues/${id}`}>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}