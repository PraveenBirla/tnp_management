import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { yearlyPlacementData, branchWiseData, packageDistribution } from '../../data/mockStats'
import {PlacementChart} from "../../components/HomePageComponents/PlacementChart"
const COLORS = ['#0A1F44', '#F5A623', '#10B981', '#3B82F6', '#EF4444']

export default function Statistics() {
  return (
     <PlacementChart/>
  )
}
