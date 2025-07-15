import React, { useState, useEffect } from 'react';
import MainChat from '../components/screens/chat_screen/MainChat';
import MainReport from '../components/screens/report_screen/MainReport';
import Navbar from '../components/common/Navbar'; // Assumindo que você tem um componente Navbar

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

  // Função para alternar visibilidade de telas
  const toggleScreenVisibility = (screenId: string): void => {
    setScreens(prev => 
      prev.map(screen => 
        screen.id === screenId 
          ? { ...screen, visible: !screen.visible }
          : screen
      )
    );
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

  // Separar telas por posição
  const leftScreens = visibleScreens.filter(screen => screen.position === 'left');
  const rightScreens = visibleScreens.filter(screen => screen.position === 'right');

  return (
    <div 
      className="w-full flex flex-col overflow-hidden" 
      style={{ 
        height: '100vh',
        maxHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Navbar Superior Fixa */}
      <div className="w-full h-16 bg-gray-900 border-b border-gray-700 flex-shrink-0 z-10">
        <Navbar />
      </div>

      {/* Container Principal - Resto da Tela */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Área do Chat (Lado Esquerdo) */}
        <div className={`
          ${isMobile ? 'w-full' : 'w-1/2 min-w-[300px] max-w-[600px]'}
          h-full 
          border-r border-gray-700 
          flex flex-col 
          overflow-hidden
          bg-gray-800
        `}>
          {leftScreens.map((screen) => {
            const ScreenComponent = screen.component;
            return (
              <div key={screen.id} className="flex-1 h-full overflow-y-auto overflow-x-hidden">
                <ScreenComponent />
              </div>
            );
          })}
        </div>

        {/* Área de Conteúdo (Lado Direito) - Só exibe no desktop */}
        {!isMobile && (
          <div className="
            flex-1 
            h-full 
            flex flex-col 
            overflow-hidden
            bg-gray-900
          ">
            {rightScreens.length > 0 ? (
              rightScreens.map((screen) => {
                const ScreenComponent = screen.component;
                return (
                  <div key={screen.id} className="flex-1 h-full overflow-y-auto overflow-x-hidden">
                    <ScreenComponent />
                  </div>
                );
              })
            ) : (
              // Placeholder quando não há conteúdo no lado direito
              <div className="flex-1 flex items-center justify-center text-gray-500 overflow-hidden">
                <div className="text-center">
                  <p className="text-lg mb-2">Nenhum conteúdo selecionado</p>
                  <p className="text-sm">Selecione uma opção no chat para visualizar aqui</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;