import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCampaignStore = create(
  persist(
    (set) => ({
      // Selected leads from search
      selectedLeads: [],

      // Connection message details
      connectionMessage: "",
      followUpMessage: "",
      templateName: "",

      // Campaign status
      isPublishing: false,
      publishError: null,
      publishSuccess: false,

      // Actions
      setSelectedLeads: (leads) => set({ selectedLeads: leads }),
      addSelectedLead: (lead) =>
        set((state) => ({
          selectedLeads: [...state.selectedLeads, lead],
        })),
      removeSelectedLead: (leadId) =>
        set((state) => ({
          selectedLeads: state.selectedLeads.filter(
            (lead) => lead.identifier !== leadId
          ),
        })),
      clearSelectedLeads: () => set({ selectedLeads: [] }),

      setConnectionMessage: (message) => set({ connectionMessage: message }),
      setFollowUpMessage: (message) => set({ followUpMessage: message }),
      setTemplateName: (name) => set({ templateName: name }),

      setPublishingStatus: (status) => set({ isPublishing: status }),
      setPublishError: (error) => set({ publishError: error }),
      setPublishSuccess: (success) => set({ publishSuccess: success }),

      resetCampaign: () =>
        set({
          selectedLeads: [],
          connectionMessage: "",
          followUpMessage: "",
          templateName: "",
          isPublishing: false,
          publishError: null,
          publishSuccess: false,
        }),
    }),
    {
      name: "campaign-storage",
    }
  )
);
