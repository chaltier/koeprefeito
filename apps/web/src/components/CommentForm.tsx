import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { api } from "~/utils/api";

interface CommentFormProps {
  issueId: string;
  onCommentAdded: () => void;
}

export function CommentForm({ issueId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addComment = api.issues.addComment.useMutation({
    onSuccess: () => {
      setContent("");
      setIsSubmitting(false);
      onCommentAdded();
    },
    onError: (error) => {
      console.error("Erro ao adicionar comentário:", error);
      alert("Erro ao adicionar comentário. Tente novamente.");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      alert("Você precisa estar logado para comentar.");
      return;
    }

    if (!content.trim()) {
      alert("Por favor, escreva um comentário.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addComment.mutateAsync({
        issueId,
        content: content.trim(),
      });
    } catch (error) {
      // Error handled in onError callback
    }
  };

  if (!session) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Você precisa estar logado para comentar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Adicionar comentário
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          placeholder="Escreva seu comentário sobre esta solicitação..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500">
            {content.length}/1000 caracteres
          </p>
          <Button 
            type="submit" 
            size="sm"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? "Enviando..." : "Comentar"}
          </Button>
        </div>
      </div>
    </form>
  );
}