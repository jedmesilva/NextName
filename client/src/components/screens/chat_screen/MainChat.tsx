import { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

export default function MainChat() {
  const [brandName, setBrandName] = useState('TechFlow');
  const [currentStep, setCurrentStep] = useState('Analyzing trademark availability');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    // Aqui você pode implementar a lógica para enviar mensagens
    console.log('Mensagem enviada:', message);
    // Exemplo: adicionar mensagem ao histórico
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
  };

  return (
    <>
      <div className="w-full min-h-screen custom-selection" style={{ backgroundColor: '#2F3338' }}>
        
        {/* Header */}
        <ChatHeader 
          brandName={brandName} 
          currentStep={currentStep} 
        />

        {/* History */}
        <ChatHistory messages={messages} />

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} />

      </div>

      <style jsx>{`
        /* Personalização da seleção de texto - Global */
        .custom-selection ::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        .custom-selection ::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}