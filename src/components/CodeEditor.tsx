import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface FileType {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface CodeEditorProps {
  files: FileType[];
  onFileChange: (fileId: string, content: string) => void;
  onSave: () => void;
}

export const CodeEditor = ({ files, onFileChange, onSave }: CodeEditorProps) => {
  const [activeFile, setActiveFile] = useState(files[0]?.id || '');

  const handleSave = () => {
    onSave();
    toast.success('Изменения сохранены!');
  };

  const currentFile = files.find(f => f.id === activeFile);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <Tabs value={activeFile} onValueChange={setActiveFile} className="flex-1">
            <ScrollArea className="w-full">
              <TabsList className="bg-transparent border-0 h-10">
                {files.map((file) => (
                  <TabsTrigger
                    key={file.id}
                    value={file.id}
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
                  >
                    <Icon
                      name={
                        file.language === 'html' ? 'FileCode' :
                        file.language === 'css' ? 'Palette' :
                        file.language === 'javascript' ? 'Code' : 'File'
                      }
                      size={16}
                    />
                    {file.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </Tabs>
          <Button
            onClick={handleSave}
            size="sm"
            className="ml-4 bg-gradient-to-r from-primary to-secondary text-black font-semibold"
          >
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {currentFile ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <textarea
                value={currentFile.content}
                onChange={(e) => onFileChange(currentFile.id, e.target.value)}
                className="w-full h-full p-4 bg-background/50 text-foreground font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
                style={{
                  tabSize: 2,
                  lineHeight: '1.6',
                }}
              />
            </div>
            <div className="border-t border-border/50 px-4 py-2 bg-card/30 backdrop-blur-sm">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="FileCode" size={14} />
                  <span>{currentFile.language.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Type" size={14} />
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="AlignLeft" size={14} />
                  <span>{currentFile.content.split('\n').length} строк</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Icon name="FileCode" size={64} className="text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Выберите файл для редактирования</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
