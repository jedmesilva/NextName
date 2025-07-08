import { useState, useEffect } from 'react';
import { AtSign, Instagram, Twitter, Facebook, Linkedin, Youtube, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function UsernameAvailabilityChecker({ 
  brandName, 
  onStatusChange, 
  autoStart = false,
  isActive = false 
}) {
  const [socialMediaStatus, setSocialMediaStatus] = useState({
    instagram: 'waiting',
    twitter: 'waiting',
    facebook: 'waiting',
    linkedin: 'waiting',
    youtube: 'waiting'
  });
  const [isChecking, setIsChecking] = useState(false);

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'youtube', name: 'YouTube', icon: Youtube }
  ];

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

  const getSocialIcon = (platform) => {
    const platformData = socialPlatforms.find(p => p.id === platform);
    if (platformData) {
      const IconComponent = platformData.icon;
      return <IconComponent className="w-4 h-4" />;
    }
    return <AtSign className="w-4 h-4" />;
  };

  const startUsernameCheck = () => {
    if (!brandName) return;
    
    setIsChecking(true);
    onStatusChange?.('searching');
    
    // Reset statuses
    setSocialMediaStatus({
      instagram: 'waiting',
      twitter: 'waiting',
      facebook: 'waiting',
      linkedin: 'waiting',
      youtube: 'waiting'
    });

    // Start social media checks
    socialPlatforms.forEach((platform, index) => {
      setTimeout(() => {
        setSocialMediaStatus(prev => ({
          ...prev,
          [platform.id]: 'searching'
        }));
        
        setTimeout(() => {
          setSocialMediaStatus(prev => ({
            ...prev,
            [platform.id]: Math.random() > 0.7 ? 'available' : 'unavailable'
          }));
          
          // Complete after last platform
          if (index === socialPlatforms.length - 1) {
            setTimeout(() => {
              setIsChecking(false);
              onStatusChange?.('completed');
            }, 500);
          }
        }, 1000);
      }, index * 300);
    });
  };

  const resetCheck = () => {
    setSocialMediaStatus({
      instagram: 'waiting',
      twitter: 'waiting',
      facebook: 'waiting',
      linkedin: 'waiting',
      youtube: 'waiting'
    });
    setIsChecking(false);
    onStatusChange?.('waiting');
  };

  // Auto-start quando ativo
  useEffect(() => {
    if (autoStart && isActive && brandName && !isChecking) {
      startUsernameCheck();
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
          <AtSign className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
        <h3 className="font-semibold text-lg" style={{ color: '#F8FAFC' }}>
          Verificando disponibilidade do nome de usuário
        </h3>
      </div>
      
      <div className="space-y-3">
        {socialPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: 'rgba(93, 173, 226, 0.05)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded" style={{ backgroundColor: 'rgba(93, 173, 226, 0.2)' }}>
                <div style={{ color: '#F8FAFC' }}>
                  {getSocialIcon(platform.id)}
                </div>
              </div>
              <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                {platform.name}: @{brandName || 'exemplo'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusBadge(socialMediaStatus[platform.id])}
            </div>
          </div>
        ))}
        
        {!autoStart && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={startUsernameCheck}
              disabled={isChecking || !brandName}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              style={{ backgroundColor: '#5DADE2' }}
            >
              {isChecking ? 'Verificando...' : 'Verificar Usernames'}
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