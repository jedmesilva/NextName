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

  // Função para alternar visibilidade de uma tela
  const toggleScreen = (screenId: string): void => {
    setScreens(prev => 
      prev.map(screen => 
        screen.id === screenId 
          ? { ...screen, visible: !screen.visible }
          : screen
      )
    );
  };

  // Função para adicionar novas telas (para uso futuro)
  const addScreen = (screenConfig: ScreenConfig): void => {
    setScreens(prev => [...prev, screenConfig]);
  };

  // Filtrar apenas telas visíveis
  const visibleScreens = screens.filter(screen => screen.visible);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      
      {/* Header do Workspace (opcional) */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-white">Workspace</h1>
        
        {/* Controles de tela (opcional) */}
        <div className="flex gap-2">
          {screens.map(screen => (
            <button
              key={screen.id}
              onClick={() => toggleScreen(screen.id)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                screen.visible
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {screen.name}
            </button>
          ))}
        </div>
      </div>

      {/* Container principal das telas */}
      <div className="flex flex-1 overflow-hidden">
        {visibleScreens.map((screen, index) => {
          const ScreenComponent = screen.component;
          const isOnlyScreen = visibleScreens.length === 1;
          const isLastScreen = index === visibleScreens.length - 1;
          
          return (
            <div
              key={screen.id}
              className={`overflow-hidden relative ${isOnlyScreen ? 'w-full' : 'flex-1'}`}
              style={{ 
                width: isOnlyScreen ? '100%' : (screen.width || 'auto'),
                minWidth: visibleScreens.length > 1 ? '300px' : 'auto'
              }}
            >
              {/* Divisor entre telas (exceto na última) */}
              {!isLastScreen && visibleScreens.length > 1 && (
                <div className="absolute right-0 top-0 w-px h-full bg-gray-700 z-10" />
              )}
              
              {/* Renderizar o componente da tela */}
              <ScreenComponent />
            </div>
          );
        })}
      </div>

      {/* Caso nenhuma tela esteja visível */}
      {visibleScreens.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">Nenhuma tela selecionada</p>
            <p className="text-sm">Clique nos botões acima para exibir as telas</p>
          </div>
        </div>
      )}

      {/* Estilos personalizados */}
      <style jsx>{`
        /* Personalização da seleção de texto - Global */
        ::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        ::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .flex-1 {
            min-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Workspace;