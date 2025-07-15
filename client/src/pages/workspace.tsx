import React, { useState } from 'react';
import Navbar from '../components/ui/navbar/Navbar';
import MainChat from '../components/screens/chat_screen/MainChat';
import BrandArtifact from '../components/screens/brand_screen/BrandArtifact';
import { FileText } from 'lucide-react';

export default function Workspace() {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Navbar fixa no topo */}
      <Navbar />
      
      {/* Container principal que ocupa o resto da tela */}
      <div className="flex-1 flex mt-16 overflow-hidden">
        {/* Área do Chat - lado esquerdo */}
        <div className="w-1/2 h-full border-r border-gray-700">
          <MainChat />
        </div>
        
        {/* Área de Conteúdo - lado direito */}
        <div className="w-1/2 h-full overflow-y-auto" style={{ backgroundColor: '#2F3338' }}>
          {hasContent ? (
            <BrandArtifact />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <FileText 
                  className="w-16 h-16 mx-auto mb-4 text-gray-500" 
                  style={{ color: 'rgba(248, 250, 252, 0.3)' }}
                />
                <h3 
                  className="text-lg font-medium mb-2" 
                  style={{ color: 'rgba(248, 250, 252, 0.5)' }}
                >
                  Conteúdo vazio
                </h3>
                <p 
                  className="text-sm max-w-md" 
                  style={{ color: 'rgba(248, 250, 252, 0.3)' }}
                >
                  Inicie uma conversa no chat para visualizar o conteúdo aqui
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}