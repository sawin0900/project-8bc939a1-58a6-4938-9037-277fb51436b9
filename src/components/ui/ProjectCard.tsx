import { MapPin, Calendar } from "lucide-react";

interface ProjectCardProps {
  title: string;
  location: string;
  year: string;
  task: string;
  solution: string;
  result: string;
  image: string;
}

export function ProjectCard({ title, location, year, task, solution, result, image }: ProjectCardProps) {
  return (
    <div className="card-ocean overflow-hidden group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {year}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Задача</span>
          <p className="text-sm text-muted-foreground mt-1">{task}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Решение</span>
          <p className="text-sm text-muted-foreground mt-1">{solution}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Результат</span>
          <p className="text-sm text-muted-foreground mt-1">{result}</p>
        </div>
      </div>
    </div>
  );
}
