import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { api } from "~/utils/api";

interface VoteButtonProps {
  issueId: string;
  initialVotes: number;
  userVote?: "UP" | "DOWN" | null;
  onVoteChange?: (newCount: number) => void;
}

export function VoteButton({ issueId, initialVotes, userVote, onVoteChange }: VoteButtonProps) {
  const { data: session } = useSession();
  const [optimisticVotes, setOptimisticVotes] = useState(initialVotes);
  const [optimisticUserVote, setOptimisticUserVote] = useState(userVote);

  const voteIssue = api.issues.vote.useMutation({
    onMutate: async ({ type }) => {
      // Optimistic update
      let newVoteCount = optimisticVotes;
      let newUserVote: "UP" | "DOWN" | null = type;

      // Calculate vote change
      if (optimisticUserVote === type) {
        // Removing vote
        newVoteCount = optimisticVotes - 1;
        newUserVote = null;
      } else if (optimisticUserVote && optimisticUserVote !== type) {
        // Changing vote (no count change, just direction)
        newUserVote = type;
      } else {
        // Adding new vote
        newVoteCount = optimisticVotes + 1;
        newUserVote = type;
      }

      setOptimisticVotes(newVoteCount);
      setOptimisticUserVote(newUserVote);
      onVoteChange?.(newVoteCount);

      return { previousVotes: optimisticVotes, previousUserVote: optimisticUserVote };
    },
    onError: (error, variables, context) => {
      // Revert optimistic update on error
      if (context) {
        setOptimisticVotes(context.previousVotes);
        setOptimisticUserVote(context.previousUserVote);
        onVoteChange?.(context.previousVotes);
      }
      console.error("Erro ao votar:", error);
    },
    onSuccess: (data) => {
      // The optimistic update should already be correct
      console.log("Voto registrado:", data.action);
    },
  });

  const handleVote = async (type: "UP" | "DOWN") => {
    if (!session) {
      alert("Você precisa estar logado para votar.");
      return;
    }

    try {
      await voteIssue.mutateAsync({ issueId, type });
    } catch (error) {
      // Error handled in onError callback
    }
  };

  if (!session) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm">{optimisticVotes} apoios</span>
        <span className="text-xs">(faça login para apoiar)</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={optimisticUserVote === "UP" ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote("UP")}
        disabled={voteIssue.isLoading}
        className="flex items-center gap-1"
      >
        <svg 
          className={`h-4 w-4 ${optimisticUserVote === "UP" ? "text-white" : "text-gray-600"}`} 
          fill={optimisticUserVote === "UP" ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm">
          {optimisticUserVote === "UP" ? "Apoiado" : "Apoiar"}
        </span>
      </Button>
      
      <span className="text-sm font-medium text-gray-700">
        {optimisticVotes} {optimisticVotes === 1 ? "apoio" : "apoios"}
      </span>

      {optimisticUserVote === "DOWN" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVote("DOWN")}
          disabled={voteIssue.isLoading}
          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-sm">Não relevante</span>
        </Button>
      )}
    </div>
  );
}