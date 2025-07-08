import React from 'react';
import DomainAvailabilityChecker from '../../analysis_ui/DomainAvailabilityChecker';
import TrademarkChecker from '../../analysis_ui/TrademarkChecker';
import UsernameAvailabilityChecker from '../../analysis_ui/UsernameAvailabilityChecker';
import AnalysisSummary from '../../analysis_ui/AnalysisSummary';

// Tipos para os dados dos componentes de análise
interface DomainData {
  brandName: string;
  [key: string]: any;
}

interface TrademarkData {
  brandName: string;
  [key: string]: any;
}

interface UsernameData {
  brandName: string;
  [key: string]: any;
}

interface SummaryData {
  brandName: string;
  [key: string]: any;
}

interface AnalysisData {
  domainData?: DomainData;
  trademarkData?: TrademarkData;
  usernameData?: UsernameData;
  summaryData?: SummaryData;
}

interface AnalysisComponentsConfig {
  showDomainChecker?: boolean;
  showTrademarkChecker?: boolean;
  showUsernameChecker?: boolean;
  showAnalysisSummary?: boolean;
  analysisData?: AnalysisData;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
  showDomainChecker?: boolean;
  showTrademarkChecker?: boolean;
  showUsernameChecker?: boolean;
  showAnalysisSummary?: boolean;
  domainData?: DomainData;
  trademarkData?: TrademarkData;
  usernameData?: UsernameData;
  summaryData?: SummaryData;
}

interface ChatHistoryProps {
  messages?: Message[];
  showAnalysisComponents?: AnalysisComponentsConfig;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  messages = [], 
  showAnalysisComponents = {} 
}) => {
  const {
    showDomainChecker = false,
    showTrademarkChecker = false,
    showUsernameChecker = false,
    showAnalysisSummary = false,
    analysisData = {}
  } = showAnalysisComponents;

  return (
    <>
      <div className="pt-20 pb-48 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Mensagem inicial da AI */}
          <div className="text-cream text-left leading-relaxed text-lg">
            <p className="mb-4">
              Olá! Sou sua assistente especializada em análise de disponibilidade de nomes de marca. Posso ajudá-lo a verificar se o nome da sua marca está disponível em diferentes registros, incluindo marcas registradas, domínios web e redes sociais.
            </p>
            <p className="mb-4">
              Para começar, você pode me fornecer o nome que deseja verificar e eu farei uma análise completa da disponibilidade. Também posso sugerir alternativas caso o nome escolhido já esteja em uso.
            </p>
          </div>

          {/* Balão de mensagem do usuário 1 */}
          <div className="flex justify-end">
            <div className="bg-message-balloon text-cream p-3 w-full message-balloon">
              Oi! Preciso verificar se o nome "TechFlow" está disponível para registrar como marca.
            </div>
          </div>

          {/* Resposta da AI */}
          <div className="text-cream text-left leading-relaxed text-lg">
            <p className="mb-4">
              Perfeito! Vou analisar a disponibilidade do nome "TechFlow" para você. Estou verificando nos principais registros de marcas, domínios disponíveis e presença em redes sociais.
            </p>
            <p className="mb-4">
              Com base na minha análise inicial, encontrei algumas questões importantes que você deve considerar antes de prosseguir com o registro. Existem marcas similares já registradas em categorias relacionadas à tecnologia.
            </p>
          </div>

          {/* Componentes de Análise - Renderizados condicionalmente */}
          {showDomainChecker && analysisData.domainData && (
            <div className="my-6">
              <DomainAvailabilityChecker {...analysisData.domainData} />
            </div>
          )}

          {showTrademarkChecker && analysisData.trademarkData && (
            <div className="my-6">
              <TrademarkChecker {...analysisData.trademarkData} />
            </div>
          )}

          {showUsernameChecker && analysisData.usernameData && (
            <div className="my-6">
              <UsernameAvailabilityChecker {...analysisData.usernameData} />
            </div>
          )}

          {showAnalysisSummary && analysisData.summaryData && (
            <div className="my-6">
              <AnalysisSummary {...analysisData.summaryData} />
            </div>
          )}

          {/* Balão de mensagem do usuário 2 */}
          <div className="flex justify-end">
            <div className="bg-message-balloon text-cream p-3 w-full message-balloon">
              Quais são as alternativas que você sugere então?
            </div>
          </div>

          {/* Resposta da AI */}
          <div className="text-cream text-left leading-relaxed text-lg">
            <p className="mb-4">
              Baseado na análise do nome "TechFlow", aqui estão algumas alternativas que mantêm a essência do seu conceito original:
            </p>
            <p className="mb-4">
              • FlowTech Solutions - Disponível para registro<br/>
              • TechStream Pro - Domínio .com disponível<br/>
              • Digital Flow Labs - Sem conflitos encontrados<br/>
              • StreamTech Innovation - Análise positiva
            </p>
          </div>

          {/* Balão de mensagem do usuário 3 */}
          <div className="flex justify-end">
            <div className="bg-message-balloon text-cream p-3 w-full message-balloon">
              Como posso verificar a disponibilidade do meu nome de marca?
            </div>
          </div>

          {/* Resposta da AI com demonstração dos componentes */}
          <div className="text-cream text-left leading-relaxed text-lg">
            <p className="mb-4">
              Ótima pergunta! Vou mostrar como funciona nossa análise completa. Começando pela verificação de domínio:
            </p>
            
            {/* Componente de verificação de domínio - sempre ativo para demonstração */}
            <div className="my-6">
              <DomainAvailabilityChecker
                brandName="TechFlow"
                autoStart={true}
                isActive={true}
                onStatusChange={(status) => console.log('Domain status:', status)}
              />
            </div>
            
            <p className="mb-4">
              Agora verificando marcas registradas nos principais órgãos:
            </p>
            
            {/* Componente de verificação de marcas - sempre ativo para demonstração */}
            <div className="my-6">
              <TrademarkChecker
                brandName="TechFlow"
                autoStart={true}
                isActive={true}
                onStatusChange={(status) => console.log('Trademark status:', status)}
              />
            </div>
            
            <p className="mb-4">
              E verificando disponibilidade nas redes sociais:
            </p>
            
            {/* Componente de verificação de redes sociais - sempre ativo para demonstração */}
            <div className="my-6">
              <UsernameAvailabilityChecker
                brandName="TechFlow"
                autoStart={true}
                isActive={true}
                onStatusChange={(status) => console.log('Username status:', status)}
              />
            </div>
            
            <p className="mb-4">
              Aqui está o resumo completo da análise:
            </p>
            
            {/* Componente de resumo - sempre ativo para demonstração */}
            <div className="my-6">
              <AnalysisSummary
                brandName="TechFlow"
                isVisible={true}
                customTitle="Resumo da Análise Completa"
              />
            </div>
            
            <p className="mb-4">
              Esses são os componentes que uso para fazer a análise completa. Você pode testá-los enviando mensagens como:
              <br/>• "verificar domínio [nome]"
              <br/>• "verificar marca [nome]"
              <br/>• "verificar redes sociais [nome]"
              <br/>• "análise completa [nome]"
            </p>
          </div>

          {/* Renderização dinâmica de mensagens */}
          {messages.map((message: Message, index: number) => (
            <div key={index}>
              {message.sender === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-message-balloon text-cream p-3 w-full message-balloon">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className="text-cream text-left leading-relaxed text-lg">
                  <p className="mb-4">{message.text}</p>
                  
                  {/* Renderizar componentes de análise se especificado na mensagem */}
                  {message.showDomainChecker && message.domainData && (
                    <div className="my-6">
                      <DomainAvailabilityChecker {...message.domainData} />
                    </div>
                  )}
                  
                  {message.showTrademarkChecker && message.trademarkData && (
                    <div className="my-6">
                      <TrademarkChecker {...message.trademarkData} />
                    </div>
                  )}
                  
                  {message.showUsernameChecker && message.usernameData && (
                    <div className="my-6">
                      <UsernameAvailabilityChecker {...message.usernameData} />
                    </div>
                  )}
                  
                  {message.showAnalysisSummary && message.summaryData && (
                    <div className="my-6">
                      <AnalysisSummary {...message.summaryData} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        .text-cream {
          color: #F8FAFC;
        }
        
        .bg-message-balloon {
          background-color: rgba(93, 173, 226, 0.15);
          border: 1px solid rgba(93, 173, 226, 0.2);
        }
        
        /* Balão de mensagem com 3 cantos arredondados e 1 com pouco arredondamento */
        .message-balloon {
          border-radius: 1rem 1rem 0.25rem 1rem;
        }
      `}</style>
    </>
  );
};

export default ChatHistory;