import { Pet } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  pets: Pet[];
  filterpets: Pet[];
  pet: Pet[];
  selectedPet: Pet | null | undefined;
  setSelectedPet: (pet: Pet | null | undefined) => void;
  setAllPets: (pets: Pet[]) => void;
  setAllPet: (pet: Pet[]) => void;
  setAllFilterPets: (filterpets: Pet[]) => void;
  setLoading: (loading: boolean) => void;
};

export const usePetStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      pets: [],
      filterpets: [],
      pet: [],
      selectedPet: null,
      setAllPets: (pets: Pet[]) => {
        set({ pets: pets, loading: false });
      },
      setAllPet: (pet: Pet[]) => {
        set({ pet: pet, loading: false });
      },
      setAllFilterPets: (filterpets: Pet[]) => {
        set({ filterpets: filterpets, loading: false });
      },
      setSelectedPet: (pet: Pet | null | undefined) => {
        set({ selectedPet: pet, loading: false });
      },
      setLoading: (loading: boolean) => {
        set({ loading: loading });
      },
    }),
    {
      name: "pet_store",
    }
  )
);
