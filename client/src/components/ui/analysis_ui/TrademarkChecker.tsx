import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function TrademarkChecker({ 
  brandName, 
  onStatusChange, 
  autoStart = false,
  isActive = false 
}) {
  const [expandedSections, setExpandedSections] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  // Configuração das instituições e tipos de pesquisa
  const trademarkInstitutions = [
    {
      id: 'inpi-brasil',
      name: 'INPI Brasil',
      country: 'Brasil',
      searchTypes: [
        { id: 'exact', name: 'Busca Exata' },
        { id: 'radical', name: 'Busca Radical' },
        { id: 'phonetic', name: 'Busca Fonética' },
        { id: 'figurative', name: 'Busca Figurativa' }
      ]
    },
    {
      id: 'uspto',
      name: 'USPTO',
      country: 'Estados Unidos',
      searchTypes: [
        { id: 'exact', name: 'Exact Match' },
        { id: 'contains', name: 'Contains' },
        { id: 'sounds_like', name: 'Sounds Like' },
        { id: 'boolean', name: 'Boolean Search' }
      ]
    },
    {
      id: 'euipo',
      name: 'EUIPO',
      country: 'União Europeia',
      searchTypes: [
        { id: 'exact', name: 'Exact Match' },
        { id: 'fuzzy', name: 'Fuzzy Search' },
        { id: 'phonetic', name: 'Phonetic Search' },
        { id: 'wildcard', name: 'Wildcard Search' }
      ]
    },
    {
      id: 'wipo',
      name: 'WIPO',
      country: 'Internacional',
      searchTypes: [
        { id: 'exact', name: 'Exact Match' },
        { id: 'madrid', name: 'Madrid System' },
        { id: 'global_brand', name: 'Global Brand Database' }
      ]
    }
  ];

  const [trademarkStatuses, setTrademarkStatuses] = useState(
    trademarkInstitutions.reduce((acc, institution) => {
      acc[institution.id] = institution.searchTypes.reduce((typeAcc, searchType) => {
        typeAcc[searchType.id] = 'waiting';
        return typeAcc;
      }, {});
      return acc;
    }, {})
  );

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'searching':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Pesquisando...
          </span>
        );
      case 'available':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disponível
          </span>
        );
      case 'unavailable':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            Não disponível
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
            <div className="w-3 h-3 mr-1 rounded-full bg-gray-500/30" />
            Aguardando
          </span>
        );
    }
  };

  const getInstitutionProgress = (institutionId) => {
    const statuses = Object.values(trademarkStatuses[institutionId] || {});
    const completed = statuses.filter(status => status === 'available' || status === 'unavailable').length;
    const total = statuses.length;
    const searching = statuses.filter(status => status === 'searching').length;
    
    return { completed, total, searching, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const startTrademarkCheck = () => {
    if (!brandName) return;
    
    setIsChecking(true);
    onStatusChange?.('searching');
    
    // Reset statuses
    setTrademarkStatuses(
      trademarkInstitutions.reduce((acc, institution) => {
        acc[institution.id] = institution.searchTypes.reduce((typeAcc, searchType) => {
          typeAcc[searchType.id] = 'waiting';
          return typeAcc;
        }, {});
        return acc;
      }, {})
    );

    // Start trademark searches
    trademarkInstitutions.forEach((institution, instIndex) => {
      setTimeout(() => {
        institution.searchTypes.forEach((searchType, typeIndex) => {
          setTimeout(() => {
            setTrademarkStatuses(prev => ({
              ...prev,
              [institution.id]: {
                ...prev[institution.id],
                [searchType.id]: 'searching'
              }
            }));
            
            setTimeout(() => {
              setTrademarkStatuses(prev => ({
                ...prev,
                [institution.id]: {
                  ...prev[institution.id],
                  [searchType.id]: Math.random() > 0.6 ? 'available' : 'unavailable'
                }
              }));
            }, 1000 + Math.random() * 1000);
          }, typeIndex * 300);
        });
      }, instIndex * 500);
    });
    
    // Complete after all searches
    setTimeout(() => {
      setIsChecking(false);
      onStatusChange?.('completed');
    }, 8000);
  };

  const resetCheck = () => {
    setTrademarkStatuses(
      trademarkInstitutions.reduce((acc, institution) => {
        acc[institution.id] = institution.searchTypes.reduce((typeAcc, searchType) => {
          typeAcc[searchType.id] = 'waiting';
          return typeAcc;
        }, {});
        return acc;
      }, {})
    );
    setIsChecking(false);
    onStatusChange?.('waiting');
  };

  // Auto-start quando ativo
  useEffect(() => {
    if (autoStart && isActive && brandName && !isChecking) {
      startTrademarkCheck();
    }
  }, [autoStart, isActive, brandName]);

  // Reset quando brandName muda
  useEffect(() => {
    resetCheck();
  }, [brandName]);

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-500 ${
        isActive ? 'border-blue-400 bg-blue-500/10' : 'border-transparent bg-gray-800/30'
      }`}
      style={{ 
        backgroundColor: isActive ? 'rgba(93, 173, 226, 0.15)' : 'rgba(93, 173, 226, 0.05)',
        borderColor: isActive ? 'rgba(93, 173, 226, 0.3)' : 'transparent'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/20' : 'bg-gray-600/20'}`}>
          <Shield className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
        <h3 className="font-semibold text-lg" style={{ color: '#F8FAFC' }}>
          Verificando propriedade da marca
        </h3>
      </div>
      
      <div className="space-y-4">
        {trademarkInstitutions.map((institution) => {
          const progress = getInstitutionProgress(institution.id);
          const isExpanded = expandedSections[institution.id];
          
          return (
            <div
              key={institution.id}
              className="border rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(93, 173, 226, 0.05)',
                borderColor: 'rgba(93, 173, 226, 0.2)'
              }}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-blue-500/5 transition-colors"
                onClick={() => toggleSection(institution.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}>
                      <Shield className="w-4 h-4" style={{ color: '#F8FAFC' }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#F8FAFC' }}>
                        {institution.name}
                      </h4>
                      <p className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.7)' }}>
                        {institution.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.7)' }}>
                      {progress.completed}/{progress.total} concluído
                    </div>
                    {progress.searching > 0 && (
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                        <span className="text-xs text-blue-400">{progress.searching} pesquisando</span>
                      </div>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" style={{ color: '#5DADE2' }} />
                    ) : (
                      <ChevronDown className="w-4 h-4" style={{ color: '#5DADE2' }} />
                    )}
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className="mt-3 w-full bg-gray-700/30 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2">
                  {institution.searchTypes.map((searchType) => (
                    <div
                      key={searchType.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}
                    >
                      <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                        {searchType.name}: {brandName || 'exemplo'}
                      </span>
                      {getStatusBadge(trademarkStatuses[institution.id]?.[searchType.id] || 'waiting')}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        
        {!autoStart && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={startTrademarkCheck}
              disabled={isChecking || !brandName}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              style={{ backgroundColor: '#5DADE2' }}
            >
              {isChecking ? 'Verificando...' : 'Verificar Marcas'}
            </button>
            
            <button
              onClick={resetCheck}
              disabled={isChecking}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 hover:bg-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                color: '#F8FAFC', 
                borderColor: 'rgba(93, 173, 226, 0.3)',
                backgroundColor: 'rgba(93, 173, 226, 0.1)'
              }}
            >
              Resetar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}