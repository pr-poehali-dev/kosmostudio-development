import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Project {
  id: string;
  name: string;
  createdAt: Date;
  url?: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project) => void;
  onCreateProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectSidebar = ({
  projects,
  currentProject,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}: ProjectSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleCreate = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName);
      setNewProjectName('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-border/50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:scale-105 transition-transform">
              <Icon name="Plus" size={18} className="mr-2" />
              Новый проект
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-primary/30">
            <DialogHeader>
              <DialogTitle>Создать новый проект</DialogTitle>
              <DialogDescription>
                Введите название для вашего проекта
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Название проекта"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                className="bg-input/50"
              />
              <Button
                onClick={handleCreate}
                className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold"
              >
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                currentProject?.id === project.id
                  ? 'bg-primary/20 border border-primary/50'
                  : 'hover:bg-card/50 border border-transparent'
              }`}
              onClick={() => onSelectProject(project)}
            >
              <Icon
                name="Folder"
                size={18}
                className={currentProject?.id === project.id ? 'text-primary' : 'text-muted-foreground'}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{project.name}</p>
                <p className="text-xs text-muted-foreground">
                  {project.createdAt.toLocaleDateString('ru-RU')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject(project.id);
                }}
              >
                <Icon name="Trash2" size={16} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Icon name="HelpCircle" size={18} className="mr-2" />
            Помощь
          </Button>
        </div>
      </div>
    </div>
  );
};
