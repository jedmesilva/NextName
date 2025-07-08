import React, { useState } from 'react';
import MainChat from '../components/screens/chat_screen/MainChat';
import MainReport from '../components/screens/report_screen/MainReport';

// Tipos para configuração das telas
interface ScreenConfig {
  id: string;
  name: string;
  component: React.ComponentType;
  visible: boolean;
  position: 'left' | 'right' | 'center';
  width?: string;
}

const Workspace: React.FC = () => {
  // Configuração das telas disponíveis
  const [screens, setScreens] = useState<ScreenConfig[]>([
    {
      id: 'chat',
      name: 'Chat',
      component: MainChat,
      visible: true,
      position: 'left',
      width: '50%'
    },
    {
      id: 'report',
      name: 'Report',
      component: MainReport,
      visible: true,
      position: 'right',
      width: '50%'
    }
    // Futuras telas podem ser adicionadas aqui
  ]);

  // Função para adicionar novas telas (para uso futuro)
  const addScreen = (screenConfig: ScreenConfig): void => {
    setScreens(prev => [...prev, screenConfig]);
  };

  // Filtrar apenas telas visíveis
  const visibleScreens = screens.filter(screen => screen.visible);

  return (
    <div className="w-full h-screen flex">
      {/* Container principal das telas */}
      {visibleScreens.map((screen, index) => {
        const ScreenComponent = screen.component;
        const isOnlyScreen = visibleScreens.length === 1;
        
        return (
          <div
            key={screen.id}
            className={`${isOnlyScreen ? 'w-full' : 'flex-1'} h-full`}
            style={{ 
              width: isOnlyScreen ? '100%' : (screen.width || 'auto'),
              minWidth: visibleScreens.length > 1 ? '300px' : 'auto'
            }}
          >
            <ScreenComponent />
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;