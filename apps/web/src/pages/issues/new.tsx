import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Input } from "@koeprefeito/ui";
import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { ImageUpload } from "~/components/ImageUpload";
import { IssueCategory, IssuePriority } from "@koeprefeito/database";

interface FormData {
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
}

const categoryLabels: Record<IssueCategory, string> = {
  INFRASTRUCTURE: "Infraestrutura",
  SECURITY: "Segurança",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  ENVIRONMENT: "Meio Ambiente",
  TRANSPORT: "Transporte",
  OTHER: "Outros",
};

const priorityLabels: Record<IssuePriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

export default function NewIssuePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: IssueCategory.OTHER,
    priority: IssuePriority.MEDIUM,
    address: "",
    latitude: 0,
    longitude: 0,
    images: [],
  });

  const createIssue = api.issues.create.useMutation({
    onSuccess: (issue) => {
      router.push(`/issues/${issue.id}`);
    },
    onError: (error) => {
      console.error("Erro ao criar issue:", error);
      alert("Erro ao criar solicitação. Tente novamente.");
      setIsSubmitting(false);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      alert("Você precisa estar logado para criar uma solicitação.");
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.address.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createIssue.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        priority: formData.priority,
        address: formData.address.trim(),
        latitude: formData.latitude || -23.550520, // Default São Paulo coordinates
        longitude: formData.longitude || -46.633308,
        images: formData.images,
      });
    } catch (error) {
      // Error handled in onError callback
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada neste navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        
        // Reverse geocoding would go here in a real app
        alert("Localização capturada com sucesso!");
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert("Não foi possível obter sua localização. Por favor, insira o endereço manualmente.");
      }
    );
  };

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h1>
            <p className="text-gray-600 mb-6">Você precisa estar logado para criar uma solicitação.</p>
            <Link href="/auth/signin">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Nova Solicitação - KoePrefeito</title>
        <meta name="description" content="Criar nova solicitação para a prefeitura" />
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
              Nova Solicitação
            </h1>
          </div>
          <p className="text-gray-600">
            Relate um problema ou faça uma sugestão para a prefeitura
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              <li className="relative pr-8 sm:pr-20">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 1 ? 'bg-primary-600' : 'bg-white border-2 border-gray-300'
                }`}>
                  <span className={`text-sm font-medium ${
                    currentStep >= 1 ? 'text-white' : 'text-gray-500'
                  }`}>
                    1
                  </span>
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Informações básicas
                </span>
              </li>
              
              <li className="relative pr-8 sm:pr-20">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 2 ? 'bg-primary-600' : 'bg-white border-2 border-gray-300'
                }`}>
                  <span className={`text-sm font-medium ${
                    currentStep >= 2 ? 'text-white' : 'text-gray-500'
                  }`}>
                    2
                  </span>
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Localização e Fotos
                </span>
              </li>
              
              <li className="relative">
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 3 ? 'bg-primary-600' : 'bg-white border-2 border-gray-300'
                }`}>
                  <span className={`text-sm font-medium ${
                    currentStep >= 3 ? 'text-white' : 'text-gray-500'
                  }`}>
                    3
                  </span>
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Revisão
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentStep === 1 && "Descreva o problema ou sugestão"}
                {currentStep === 2 && "Localização e fotos"}
                {currentStep === 3 && "Revise sua solicitação"}
              </h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Título *
                    </label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Ex: Buraco na rua, semáforo quebrado, falta de iluminação..."
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      maxLength={200}
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.title.length}/200 caracteres
                    </p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição detalhada *
                    </label>
                    <textarea
                      id="description"
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      placeholder="Descreva o problema em detalhes: o que aconteceu, quando, como afeta a comunidade..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      maxLength={2000}
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.description.length}/2000 caracteres
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria *
                      </label>
                      <select
                        id="category"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as IssueCategory }))}
                        required
                      >
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <select
                        id="priority"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        value={formData.priority}
                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as IssuePriority }))}
                      >
                        {Object.entries(priorityLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço *
                    </label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Ex: Rua das Flores, 123 - Vila Madalena, São Paulo - SP"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getUserLocation}
                    >
                      📍 Usar minha localização
                    </Button>
                    <span className="text-sm text-gray-500">
                      Ou digite o endereço manualmente acima
                    </span>
                  </div>

                  {formData.latitude !== 0 && formData.longitude !== 0 && (
                    <div className="text-sm text-green-600">
                      ✅ Coordenadas capturadas: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                    </div>
                  )}

                  <div className="mt-8">
                    <ImageUpload
                      onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                      existingImages={formData.images}
                      maxImages={5}
                    />
                  </div>
                </>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Título</h3>
                    <p className="text-gray-600">{formData.title}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Descrição</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{formData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Categoria</h3>
                      <p className="text-gray-600">{categoryLabels[formData.category]}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Prioridade</h3>
                      <p className="text-gray-600">{priorityLabels[formData.priority]}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Endereço</h3>
                    <p className="text-gray-600">{formData.address}</p>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900">Imagens ({formData.images.length})</h3>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {formData.images.slice(0, 3).map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`Imagem ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {formData.images.length > 3 && (
                          <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                            +{formData.images.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                    >
                      Voltar
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Link href="/issues">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </Link>
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      disabled={
                        (currentStep === 1 && (!formData.title.trim() || !formData.description.trim())) ||
                        (currentStep === 2 && !formData.address.trim())
                      }
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </Layout>
  );
}