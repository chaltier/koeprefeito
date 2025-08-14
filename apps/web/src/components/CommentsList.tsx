import { Badge } from "@koeprefeito/ui";

interface Comment {
  id: string;
  content: string;
  isOfficial: boolean;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
    role?: string;
  };
}

interface CommentsListProps {
  comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="font-medium">Nenhum comentário ainda</p>
        <p className="text-sm">Seja o primeiro a comentar nesta solicitação</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="relative">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {comment.author.image ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={comment.author.image}
                  alt={comment.author.name || ""}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {comment.author.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">
                  {comment.author.name || "Usuário"}
                </span>
                
                {comment.isOfficial && (
                  <Badge variant="info" size="sm">
                    Oficial
                  </Badge>
                )}
                
                {comment.author.role === "ADMIN" && (
                  <Badge variant="success" size="sm">
                    Admin
                  </Badge>
                )}
                
                {comment.author.role === "MODERATOR" && (
                  <Badge variant="warning" size="sm">
                    Moderador
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

              {/* Comment text */}
              <div className={`rounded-lg px-3 py-2 ${
                comment.isOfficial 
                  ? "bg-blue-50 border border-blue-200" 
                  : "bg-gray-50 border border-gray-200"
              }`}>
                <p className="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>

          {/* Official comment indicator */}
          {comment.isOfficial && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}