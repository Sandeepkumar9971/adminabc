import {User,BookPlus,LayoutDashboard} from 'lucide-react'
export const menuGroups = [
    {
      name: "MAIN MENU",
      menuItems: [
        {
          icon: (
           <LayoutDashboard/>
          ),
          label: "Dashboard",
          route: "#",
          children: [
            { label: "Anylysis", route: "/dashboard" },
          ],
        },
        {
          icon: (
            <User/>
          ),
          label: "Teams",
          route: "#",
          children: [
            { label: "All", route: "/dashboard/teams/all" },
          ],
        },

        {
          icon: (
            <BookPlus />
          ),
          label: "Appraisal Form",
          route: "#",
          children: [
            { label: "Status", route: "/dashboard/appraisal"},
            { label: "Questions", route: "/dashboard/appraisal/questions"},
          ],
        },
      
      ],
    },
    
  ];