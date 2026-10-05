import type { Project, VisualKind } from "@/data/projects";
import { ChitYapVisual } from "./ChitYapVisual";
import { LsmVisual } from "./LsmVisual";
import { ApplyPilotVisual } from "./ApplyPilotVisual";
import { DiligenceVisual } from "./DiligenceVisual";

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  chityap: ChitYapVisual,
  lsm: LsmVisual,
  applypilot: ApplyPilotVisual,
  diligence: DiligenceVisual,
};

export function ProjectArt({ project }: { project: Project }) {
  const Visual = visuals[project.visual];
  return <Visual />;
}
