const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');

const components = [
  'HeroSection',
  'EcosystemNetwork',
  'HowItWorksTimeline',
  'SmartAIEngine',
  'HealthTimelineShowcase',
  'VoiceAssistant',
  'PopulationAnalytics',
  'SecurityVault',
  'TargetAudience',
  'FutureIntegrations',
  'MetricsGrid',
  'PricingSection',
  'FinalCTA',
  'Footer'
];

components.forEach(name => {
  const content = `import { motion } from 'framer-motion';

const ${name} = () => {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">${name}</h2>
            </div>
        </section>
    );
};

export default ${name};
`;
  fs.writeFileSync(path.join(dir, `${name}.tsx`), content, 'utf8');
});

console.log('Scaffolded 14 components');
