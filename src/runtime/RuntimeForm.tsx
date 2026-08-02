import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { getRegisteredComponent } from '@/registries';
import { RegistryStore } from './RegistryStore';

interface RuntimeFormProps {
  sectionIds: string[];
}

export function RuntimeForm({ sectionIds }: RuntimeFormProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue={sectionIds[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {sectionIds.map(sectionId => {
            const section = RegistryStore.get('sections', sectionId) as any;
            if (!section) return null;
            return (
              <TabsTrigger key={sectionId} value={sectionId}>
                {section.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {sectionIds.map(sectionId => {
          const section = RegistryStore.get('sections', sectionId) as any;
          if (!section) return null;

          // Resolve section component from component registry
          const SectionComponent = getRegisteredComponent(section.component);
          if (!SectionComponent) return null;

          return (
            <TabsContent key={sectionId} value={sectionId} className="space-y-4 mt-4">
              <SectionComponent />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
