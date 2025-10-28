import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  name: string;
  description: string;
  image: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const TemplateCard = ({ name, description, image, isSelected, onClick }: TemplateCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105",
        "border-2",
        isSelected ? "border-primary shadow-elegant" : "border-border hover:border-primary/50"
      )}
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={`${name} template`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-lg text-card-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};
