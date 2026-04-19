import React from 'react';
import PolicyCard from '../components/PolicyCard';
import { HeartPulse, Home, Car, Plane, Building2, ShieldPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  
  const policies = [
    {
      id: 'health-insurance',
      title: "Health Insurance",
      description: "Comprehensive medical coverage for you and your family.",
      icon: HeartPulse,
      price: 12000,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: 'life-insurance',
      title: "Life Insurance",
      description: "Secure the financial future of your loved ones.",
      icon: ShieldPlus,
      price: 15000,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: 'auto-insurance',
      title: "Auto Insurance",
      description: "Protect your vehicle seamlessly.",
      icon: Car,
      price: 8500,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: 'property-insurance',
      title: "Property Insurance",
      description: "Safeguard your most valuable asset.",
      icon: Home,
      price: 14000,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: 'travel-insurance',
      title: "Travel Insurance",
      description: "Travel the world without worries.",
      icon: Plane,
      price: 3500,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: 'corporate-insurance',
      title: "Corporate Insurance",
      description: "Tailored risk management for businesses.",
      icon: Building2,
      price: 45000,
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80&auto=format&fit=crop"
    }
  ];

  const handleViewPolicy = (policyTitle) => {
    const policy = policies.find(p => p.title === policyTitle);
    if(policy) navigate(`/policy/${policy.id}`);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="section-title">Our Policies</h1>
      <p className="section-subtitle">Discover our range of insurance products tailored to fit your unique needs naturally.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {policies.map((policy, index) => (
          <PolicyCard 
            key={index}
            title={policy.title}
            description={policy.description}
            icon={policy.icon}
            image={policy.image}
            onGetQuote={handleViewPolicy}
          />
        ))}
      </div>
    </div>
  );
};

export const policiesData = [
  {
    id: 'health-insurance',
    title: "Health Insurance",
    description: "Comprehensive medical coverage for you and your family. Includes emergency room visits, routine checkups, and prescription coverage.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: 'life-insurance',
    title: "Life Insurance",
    description: "Secure the financial future of your loved ones. Covers unexpected events and guarantees a payout to your designated beneficiaries.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: 'auto-insurance',
    title: "Auto Insurance",
    description: "Protect your vehicle seamlessly. Comprehensive collision coverage, roadside assistance, and liability protection.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: 'property-insurance',
    title: "Property Insurance",
    description: "Safeguard your most valuable asset against natural disasters, fire, and theft. Total home replacement guaranteed.",
    price: 14000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: 'travel-insurance',
    title: "Travel Insurance",
    description: "Travel the world without worries. Covers medical, global emergencies, trip cancellations, and lost baggage.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: 'corporate-insurance',
    title: "Corporate Insurance",
    description: "Tailored risk management and employee benefit solutions for businesses of all sizes to keep operations running smoothly.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80&auto=format&fit=crop"
  }
];

export default Services;
