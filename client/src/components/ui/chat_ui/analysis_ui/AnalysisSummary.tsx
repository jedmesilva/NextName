import { CheckCircle } from 'lucide-react';

export default function AnalysisSummary({ 
  brandName, 
  isVisible = true,
  customTitle = "Resumo da Análise",
  customAnalysisText = null,
  customRecommendationsText = null,
  className = ""
}) {
  if (!isVisible) return null;

  const defaultAnalysisText = `A análise da marca "<strong>${brandName}</strong>" foi concluída com sucesso. Foram verificadas a disponibilidade do domínio principal, registros de marca em 4 instituições internacionais (INPI Brasil, USPTO, EUIPO e WIPO) através de diferentes tipos de busca, e a disponibilidade do nome de usuário nas principais redes sociais (Instagram, Twitter, Facebook, LinkedIn e YouTube).`;

  const defaultRecommendationsText = `Com base nos resultados obtidos, recomendamos proceder com cautela. Verifique detalhadamente os conflitos encontrados nas buscas de marca registrada e considere consultar um especialista em propriedade intelectual antes de prosseguir com o registro. Para as redes sociais indisponíveis, considere variações do nome ou adicione prefixos/sufixos. O domínio principal deve ser registrado imediatamente se estiver disponível.`;

  return (
    <div className={`mb-8 p-6 rounded-2xl border ${className}`} style={{ 
      backgroundColor: 'rgba(93, 173, 226, 0.1)',
      borderColor: 'rgba(93, 173, 226, 0.3)'
    }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}>
          <CheckCircle className="w-5 h-5" style={{ color: '#F8FAFC' }} />
        </div>
        <h3 className="font-semibold text-lg" style={{ color: '#F8FAFC' }}>
          {customTitle}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}>
          <h4 className="font-medium text-sm mb-2" style={{ color: '#F8FAFC' }}>
            Análise Completa
          </h4>
          <p 
            className="text-sm leading-relaxed" 
            style={{ color: 'rgba(248, 250, 252, 0.85)' }}
            dangerouslySetInnerHTML={{ 
              __html: customAnalysisText || defaultAnalysisText 
            }}
          />
        </div>
        
        <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}>
          <h4 className="font-medium text-sm mb-2" style={{ color: '#F8FAFC' }}>
            Recomendações
          </h4>
          <p 
            className="text-sm leading-relaxed" 
            style={{ color: 'rgba(248, 250, 252, 0.85)' }}
            dangerouslySetInnerHTML={{ 
              __html: customRecommendationsText || defaultRecommendationsText 
            }}
          />
        </div>
      </div>
    </div>
  );
}