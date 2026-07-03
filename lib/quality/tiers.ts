export type QualityTier = "high" | "medium" | "low";

export const tierConfig = {
  high: {
    postprocessing: { bloom: true, dof: true, vignette: true },
    shadows: "soft" as const,
    steamPlanes: 4,
    sparkles: 60,
    pixelRatioCap: 2,
    dpr: [1, 2] as [number, number],
  },
  medium: {
    postprocessing: { bloom: true, dof: false, vignette: true },
    shadows: "off" as const,
    steamPlanes: 2,
    sparkles: 24,
    pixelRatioCap: 1.5,
    dpr: [1, 1.5] as [number, number],
  },
  low: {
    postprocessing: { bloom: false, dof: false, vignette: false },
    shadows: "off" as const,
    steamPlanes: 0,
    sparkles: 0,
    pixelRatioCap: 1,
    dpr: [1, 1] as [number, number],
  },
} as const;
