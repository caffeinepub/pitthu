import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NewBooking } from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useGetUserBookings() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery({
    queryKey: ["userBookings", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getUserBookings(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBooking: NewBooking) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBooking(newBooking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
}

export function useCancelBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelBooking(bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
}
