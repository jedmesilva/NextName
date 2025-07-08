import React, { useState } from 'react';

// Tipos para os dados do relatório
interface ReportData {
  brandName: string;
  domainAvailability: {
    available: string[];
    unavailable: string[];
  };
  trademarkStatus: {
    conflicts: number;
    similar: string[];
  };
  socialMediaAvailability: {
    available: string[];
    unavailable: string[];
  };
  overallScore: number;
}

const MainReport: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData>({
    brandName: 'TechFlow',
    domainAvailability: {
      available: ['.com', '.net', '.org'],
      unavailable: ['.io', '.app']
    },
    trademarkStatus: {
      conflicts: 2,
      similar: ['TechFlows', 'TechFlowz']
    },
    socialMediaAvailability: {
      available: ['Instagram', 'Twitter', 'LinkedIn'],
      unavailable: ['Facebook', 'TikTok']
    },
    overallScore: 78
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Resumo da Análise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-600 bg-opacity-20 rounded-lg p-4 border border-green-600 border-opacity-30">
            <h4 className="text-green-400 font-semibold mb-2">Domínios</h4>
            <p className="text-sm text-gray-300">{reportData.domainAvailability.available.length} disponíveis</p>
          </div>
          <div className="bg-yellow-600 bg-opacity-20 rounded-lg p-4 border border-yellow-600 border-opacity-30">
            <h4 className="text-yellow-400 font-semibold mb-2">Marcas</h4>
            <p className="text-sm text-gray-300">{reportData.trademarkStatus.conflicts} conflitos</p>
          </div>
          <div className="bg-blue-600 bg-opacity-20 rounded-lg p-4 border border-blue-600 border-opacity-30">
            <h4 className="text-blue-400 font-semibold mb-2">Redes Sociais</h4>
            <p className="text-sm text-gray-300">{reportData.socialMediaAvailability.available.length} disponíveis</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Score Geral</h3>
        <div className="flex items-center space-x-4">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${reportData.overallScore}%` }}
            ></div>
          </div>
          <span className="text-2xl font-bold text-white">{reportData.overallScore}%</span>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Detalhes da Análise</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Domínios Disponíveis</h4>
            <div className="flex flex-wrap gap-2">
              {reportData.domainAvailability.available.map((domain, index) => (
                <span key={index} className="bg-green-600 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {reportData.brandName}{domain}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Domínios Indisponíveis</h4>
            <div className="flex flex-wrap gap-2">
              {reportData.domainAvailability.unavailable.map((domain, index) => (
                <span key={index} className="bg-red-600 bg-opacity-20 text-red-400 px-3 py-1 rounded-full text-sm">
                  {reportData.brandName}{domain}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Marcas Similares</h4>
            <div className="flex flex-wrap gap-2">
              {reportData.trademarkStatus.similar.map((trademark, index) => (
                <span key={index} className="bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                  {trademark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h2 className="text-xl font-semibold text-white">Relatório de Análise</h2>
        <p className="text-gray-400 text-sm">Marca: {reportData.brandName}</p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Resumo' },
            { id: 'details', label: 'Detalhes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'details' && renderDetails()}
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        /* Personalização da seleção de texto */
        ::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        ::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
      `}</style>
    </div>
  );
};

export default MainReport;