import React, { useState, useEffect } from 'react';
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
  // Estado para controlar se é mobile ou desktop
  const [isMobile, setIsMobile] = useState(false);

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

  // Função para detectar tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px é o breakpoint md do Tailwind
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Função para adicionar novas telas (para uso futuro)
  const addScreen = (screenConfig: ScreenConfig): void => {
    setScreens(prev => [...prev, screenConfig]);
  };

  // Filtrar telas visíveis baseado no tamanho da tela
  const visibleScreens = screens.filter(screen => {
    if (screen.visible) {
      // No mobile, mostrar apenas a tela de chat
      if (isMobile) {
        return screen.id === 'chat';
      }
      // No desktop, mostrar todas as telas visíveis
      return true;
    }
    return false;
  });

  return (
    <div className="w-full h-screen flex overflow-hidden" style={{ 
      height: '100vh',
      maxHeight: '100vh',
      position: 'relative'
    }}>
      {/* Container principal das telas */}
      {visibleScreens.map((screen, index) => {
        const ScreenComponent = screen.component;
        const isOnlyScreen = visibleScreens.length === 1;
        
        return (
          <div
            key={screen.id}
            className={`${isOnlyScreen || isMobile ? 'w-full' : 'flex-1'} h-full overflow-hidden`}
            style={{ 
              width: isOnlyScreen || isMobile ? '100%' : (screen.width || 'auto'),
              minWidth: visibleScreens.length > 1 && !isMobile ? '300px' : 'auto',
              height: '100%',
              maxHeight: '100%'
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