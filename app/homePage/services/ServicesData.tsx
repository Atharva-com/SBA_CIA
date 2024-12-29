import { FaHome, FaUsers, FaTrophy, FaWallet, FaClock, FaLeaf, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    icon: <FaHome className="w-8 h-8" />,
    title: "Architectural Design Services",
    description: "Expert architectural design for residential, commercial, and industrial spaces, blending functionality with aesthetics.",
    features: [
      "Customizable Floor Plans",
      "Conceptual and Detailed Schematic Designs",
      "Development of 3D Architectural Models"
    ],
    benefits: [
      { icon: <FaClock />, text: "Quick turnaround for initial designs (4-6 weeks)" },
      { icon: <FaTrophy />, text: "Award-winning architectural solutions" },
      { icon: <FaWallet />, text: "Transparent pricing with no hidden costs" },
      { icon: <FaUsers />, text: "Dedicated support from start to finish" }
    ],
    processSteps: [
      "Consultation & Requirements Gathering",
      "Conceptual Sketches & Design Layouts",
      "3D Modeling & Virtual Presentations",
      "Comprehensive Planning & Documentation",
      "On-Site Supervision & Guidance"
    ]
  },
//   {
//     icon: <FaBuilding className="w-8 h-8" />,
//     title: "Commercial Architecture",
//     description: "Enhance productivity and collaboration with innovative office and commercial space designs.",
//     features: [
//       "Space Optimization & Efficient Layouts",
//       "Modern Amenities & Facilities",
//       "Smart Technology Integration",
//     ],
//     benefits: [
//       { icon: <FaClock />, text: "Completion timelines of 8-12 weeks" },
//       { icon: <FaTrophy />, text: "Recognized for cutting-edge office designs" },
//       { icon: <FaWallet />, text: "Tailored solutions to fit your budget" },
//       { icon: <FaUsers />, text: "Expert commercial architects on board" }
//     ],
//     processSteps: [
//       "Initial Workplace Assessment",
//       "Custom Layout Design & Planning",
//       "Technology & Furniture Integration",
//       "Material Selection & Procurement",
//       "Implementation Support"
//     ]
//   },
  {
    icon: <FaLeaf className="w-8 h-8" />,
    title: "Landscape Architecture",
    description: "Create sustainable and visually stunning outdoor spaces tailored to your lifestyle and environment.",
    features: [
      "Eco-Friendly Garden Planning",
      "Outdoor Living Area Design",
      "Space Optimization & Efficient Layouts",
    ],
    benefits: [
      { icon: <FaClock />, text: "Year-round seasonal landscaping plans" },
      { icon: <FaTrophy />, text: "Sustainable, award-winning designs" },
      { icon: <FaWallet />, text: "Cost-efficient and low-maintenance solutions" },
      { icon: <FaUsers />, text: "Collaborative team of horticulture experts" }
    ],
    processSteps: [
      "Site Analysis & Consultation",
      "Conceptual Landscape Design",
      "Layout & Planning",
      "Final Installation & Aftercare Guide"
    ]
  },
  {
    icon: <FaPaintBrush className="w-8 h-8" />,
    title: "Interior Design Solutions",
    description: "Transform your interiors with tailored designs that combine functionality, elegance, and comfort.",
    features: [
      "Personalized Color & Material Selection",
      "Innovative Lighting Solutions",
      "Bespoke Furniture Layouts",
    ],
    benefits: [
      { icon: <FaClock />, text: "Initial concepts delivered within 2 weeks" },
      { icon: <FaTrophy />, text: "Access to exclusive designer collections" },
      { icon: <FaWallet />, text: "Flexible and affordable design packages" },
      { icon: <FaUsers />, text: "Experienced interior designers" }
    ],
    processSteps: [
      "Client Consultation & Style Discovery",
      "Mood Board & Concept Development",
      "Material & Color Scheme Finalization",
      "Furniture Sourcing & Customization",
      "On-Site Installation & Final Styling"
    ]
  }
];

export default services;
