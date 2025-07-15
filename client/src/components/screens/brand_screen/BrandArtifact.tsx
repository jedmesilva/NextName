import { useState } from 'react';
import { ArrowLeft, Calendar, Activity, Globe, Instagram, Twitter, Facebook, Linkedin, Youtube, Shield, Download, Edit, Share2 } from 'lucide-react';

export default function BrandArtifact() {
  const [projectData] = useState({
    logo: '/api/placeholder/120/120', // Placeholder para logo
    name: 'TechFlow Solutions',
    createdDate: '15 de Janeiro, 2024',
    status: 'Ativo',
    description: 'TechFlow Solutions é uma empresa de tecnologia focada em desenvolver soluções inovadoras para otimização de processos empresariais. Nossa missão é simplificar a complexidade tecnológica e torná-la acessível para empresas de todos os tamanhos, proporcionando ferramentas que aumentam a produtividade e reduzem custos operacionais.',
    domains: [
      { url: 'techflowsolutions.com', status: 'Registrado', registrar: 'GoDaddy' },
      { url: 'techflow.com.br', status: 'Registrado', registrar: 'Registro.br' },
      { url: 'techflowsolutions.net', status: 'Disponível', registrar: '-' }
    ],
    socialMedia: [
      { platform: 'Instagram', username: '@techflowsolutions', url: 'instagram.com/techflowsolutions', status: 'Ativo' },
      { platform: 'Twitter', username: '@techflowsol', url: 'twitter.com/techflowsol', status: 'Ativo' },
      { platform: 'Facebook', username: '@techflowsolutions', url: 'facebook.com/techflowsolutions', status: 'Ativo' },
      { platform: 'LinkedIn', username: '@techflow-solutions', url: 'linkedin.com/company/techflow-solutions', status: 'Ativo' },
      { platform: 'YouTube', username: '@techflowsolutions', url: 'youtube.com/@techflowsolutions', status: 'Ativo' }
    ],
    brandProperties: [
      { type: 'Marca Registrada', name: 'TechFlow Solutions', institution: 'INPI Brasil', number: 'BR512024000123', status: 'Aprovado' },
      { type: 'Marca Registrada', name: 'TechFlow', institution: 'USPTO', number: 'US97123456', status: 'Em Análise' },
      { type: 'Marca Registrada', name: 'TechFlow Solutions', institution: 'EUIPO', number: 'EU018123456', status: 'Aprovado' },
      { type: 'Domínio Premium', name: 'techflow.com', institution: 'USPTO', number: 'US97789123', status: 'Registrado' }
    ]
  });

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'registrado':
      case 'aprovado':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            {status}
          </span>
        );
      case 'em análise':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
            {status}
          </span>
        );
      case 'disponível':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
            {status}
          </span>
        );
    }
  };

  const goBack = () => {
    console.log('Voltar para lista de marcas');
  };

  const handleEdit = () => {
    console.log('Editar projeto');
  };

  const handleShare = () => {
    console.log('Compartilhar projeto');
  };

  const handleDownloadPDF = () => {
    console.log('Baixar PDF');
  };

  return (
    <div className="w-full min-h-screen custom-selection" style={{ backgroundColor: '#2F3338' }}>
      {/* Conteúdo principal */}
      <div className="pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho do documento */}
          <div className="mb-8 p-8 rounded-2xl border" style={{ 
            backgroundColor: 'rgba(93, 173, 226, 0.05)',
            borderColor: 'rgba(93, 173, 226, 0.15)'
          }}>
            {/* Logo e nome */}
            <div className="flex flex-col mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 mb-4" style={{ borderColor: 'rgba(93, 173, 226, 0.3)' }}>
                <img 
                  src={projectData.logo} 
                  alt={`${projectData.name} logo`}
                  className="w-full h-full object-cover bg-gray-700/50"
                />
              </div>
              
              <div className="w-full">
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#F8FAFC' }}>
                  {projectData.name}
                </h2>
                
                {/* Linha horizontal com data e status */}
                <div className="w-full h-px mb-4" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: 'rgba(248, 250, 252, 0.65)' }} />
                    <span className="text-sm" style={{ color: 'rgba(248, 250, 252, 0.65)' }}>
                      Criado em: {projectData.createdDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" style={{ color: 'rgba(248, 250, 252, 0.65)' }} />
                    <span className="text-sm mr-2" style={{ color: 'rgba(248, 250, 252, 0.65)' }}>Status:</span>
                    {getStatusBadge(projectData.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Apresentação */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#F8FAFC' }}>
              Sobre
            </h3>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248, 250, 252, 0.85)' }}>
                {projectData.description}
              </p>
            </div>
          </div>

          {/* Seção de Domínios */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#F8FAFC' }}>
              Domínios
            </h3>
            <div className="space-y-3">
              {projectData.domains.map((domain, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4" style={{ color: '#5DADE2' }} />
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                        {domain.url}
                      </span>
                      <p className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.65)' }}>
                        Registrar: {domain.registrar}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(domain.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Redes Sociais */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#F8FAFC' }}>
              Perfis nas Redes Sociais
            </h3>
            <div className="space-y-3">
              {projectData.socialMedia.map((social, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}>
                      <div style={{ color: '#F8FAFC' }}>
                        {getSocialIcon(social.platform)}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                        {social.username}
                      </span>
                      <p className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.65)' }}>
                        {social.url}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(social.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Propriedades de Marca */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#F8FAFC' }}>
              Propriedades de Marca
            </h3>
            <div className="space-y-3">
              {projectData.brandProperties.map((property, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}>
                      <Shield className="w-4 h-4" style={{ color: '#F8FAFC' }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                        {property.name}
                      </span>
                      <p className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.65)' }}>
                        {property.institution} • {property.number}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(property.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé do documento */}
          <div className="mt-12 pt-6 border-t text-center" style={{ borderColor: 'rgba(93, 173, 226, 0.15)' }}>
            <p className="text-xs" style={{ color: 'rgba(248, 250, 252, 0.45)' }}>
              Documento gerado em {new Date().toLocaleDateString('pt-BR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} • NextName.app
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Personalização da seleção de texto */
        .custom-selection ::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        .custom-selection ::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        /* Personalizar a scrollbar */
        .custom-selection::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-selection::-webkit-scrollbar-track {
          background: rgba(248, 250, 252, 0.1);
          border-radius: 4px;
        }
        
        .custom-selection::-webkit-scrollbar-thumb {
          background: rgba(93, 173, 226, 0.3);
          border-radius: 4px;
        }
        
        .custom-selection::-webkit-scrollbar-thumb:hover {
          background: rgba(93, 173, 226, 0.5);
        }
        
        /* Suporte a impressão para PDF */
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .flex-col {
            flex-direction: column;
          }
          
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .text-3xl {
            font-size: 1.5rem;
          }
          
          .gap-6 {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}