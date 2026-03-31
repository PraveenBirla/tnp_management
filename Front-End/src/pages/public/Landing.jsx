
import { Users, Building2, TrendingUp, Award } from 'lucide-react'
import { yearlyPlacementData } from '../../data/mockStats'
import {Hero} from '../../components/HomePageComponents/Hero'
import { StatsGrid } from '../../components/HomePageComponents/StatsGrid'
import { PlacementChart } from '../../components/HomePageComponents/PlacementChart'
import { CTA } from '../../components/HomePageComponents/CTA'
import {VisitedCompanies} from '../../components/HomePageComponents/VisitedCompanies'
const quickStats = [
  { icon: Users, value: '380+', label: 'Students Registered', color: '#78350f' },
  { icon: Building2, value: '55+', label: 'Recruiting Companies', color: '#b45309' },
  { icon: TrendingUp, value: '85%', label: 'Placement Rate', color: '#92400e' },
  { icon: Award, value: '₹45 LPA', label: 'Highest Package', color: '#78350f' },
]



export default function Landing() {
  return <div className="landing-page-wrapper">
               <Hero />
               <StatsGrid stats={quickStats} />
               <VisitedCompanies />
               <PlacementChart data={yearlyPlacementData} />


               <style>{`
                 :root {
                   --brand-brown: #451a03;
                   --brand-gold: #d97706;
                   --bg-light: #F5E9D8;
                   --bg-darker: #D6C1A4;
                 }

                 .landing-page-wrapper {
                   background: linear-gradient(180deg, var(--bg-light) 0%, var(--bg-darker) 100%);
                   min-height: 100vh;
                   color: var(--brand-brown);
                 }


                 .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
                 .hero-section { padding: 8rem 1rem; text-align: center; }
                 .hero-title { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 800; }
                 .text-highlight { color: var(--brand-gold); }
                 .btn-primary { background: var(--brand-brown); color: white; padding: 0.8rem 2rem; border-radius: 10px; text-decoration: none; }
                 .stat-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 16px; display: flex; align-items: center; gap: 1rem; }
                 /* ... baki styles ... */
               `}</style>
             </div>

}